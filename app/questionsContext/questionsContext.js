var request = require('request');
var promise = require('promise');
var config = require('./../../config.js');
var morph = require('./morph/yandexSpeechKit.js')(config, promise, request);
var natural = require('./morph/natural.js')(config, promise, request);

var message = {};

var questionsContext = (function (mongoClient) {

    var currMessage = {};
    var mongod;

    mongoClient.connect(config.dbconn, function (err, db) {
        if (err)
            return;
        mongod = db;
    });

    var getQuestionsContext = function (msg) {

        /*-----*/
        natural.init();
        /*-----*/

        currMessage = msg;
        var answer = {
            text: '',
            menu: {}
        };

        var resolve,
            reject,
            Q = new promise(function (promiseResolve, promiseReject) {
                resolve = promiseResolve;
                reject = promiseReject;
            });

        //Запрашиваем морфологию
        var wordObj = morph.getMorph(msg.text);
        var wordsArr = [];
        wordObj.then(function (obj) {
            var queryString = [];
            obj.Morph.forEach(function (word) {
                word.Lemmas.forEach(function (point) {
                    wordsArr.push({
                        text: point.Text,
                        grammems: point.Grammems
                    });
                    queryString.push({
                        'entryPoints': point.Text
                    });
                });
            });
            console.log(wordsArr);
            /*Поиск списка контекстов по входящим словам*/
            findContext(queryString);
        }).catch(function (err) {
            console.log("Ошибка");
            console.log(err);
        });

        return Q;

        function findContext(queryString) {/*Поиск списка контекстов по входящим словам*/
            var query = mongod.collection('context').find({$or: queryString});
            query.count().then(function (resCount) {
                console.log("найдено контекстов - " + resCount);
                if (resCount > 0) {
                    query.toArray(getContextAccordingRules);
                } else {
                    answer.text = "К сожалению, я не знаю того, что вы мне написали. Однако, я запишу ваш вопрос в список незнакомых, и модераторы добавят ответ.";
                    resolve(answer);
                    //Сохранение в БД нераспознанного контекста
                    /*saveQuestion({
                     message: currMessage,
                     answer: {},
                     possibleContext: [],
                     recognize: 'negative'
                     });*/
                }
            });
        }

        function getContextAccordingRules(err, contextList) {
            if (err) {
                throw err;
                console.log("MongoDB error!");
                return;
            }
            var exSysTable = [];

            var maxRules = 0;
            contextList.forEach(function (item, index) {//Проходим по каждому найденному контексту
                if (item.exSysRules.length > maxRules) {
                    maxRules = item.exSysRules.length;
                }

                var rulesExecutedCount = 0;//Количество выполненных правил
                item.exSysRules.forEach(function (rule) {//Проходим по каждому правилу в текущем контексте
                    rulesExecutedCount += rule.entryPoints.some(function (point) {
                        return wordsArr.some(function (word) {
                            return word.text == point;
                        });
                    });
                });

                exSysTable.push({
                    title: item.title,
                    basicQuestion: item.defaultQuestion,
                    rulesExecutedCount: rulesExecutedCount,
                    indexContext: index,
                    weight: 0,
                    questionsCount: item.exSysRules.length
                });
            });

            var maxIndexesContext,
                maxWeight = 0,
                minQuestions;

            exSysTable.forEach(function (item) {
                item.weight = (item.rulesExecutedCount / maxRules) * 100;
                if (item.weight > maxWeight) {
                    maxWeight = item.weight;
                }
            });

            maxIndexesContext = exSysTable.filter(function (item) {
                return item.weight == maxWeight;
            }).map(function (item) {
                return {
                    indexContext: item.indexContext,
                    questionsCount: item.questionsCount
                }
            });

            maxIndexesContext.forEach(function (item) {
                if (!minQuestions) minQuestions = item.questionsCount;
                if (item.questionsCount < minQuestions) {
                    minQuestions = item.questionsCount;
                }
            });

            if (maxIndexesContext.length > 1) {
                maxIndexesContext = maxIndexesContext.filter(function (item) {
                    return item.questionsCount == minQuestions;
                });
            }

            if (maxIndexesContext.length > 1) {//Если вариантов ответов больше чем 1, показываем меню с вариантами
                var possibleQuestions = [];
                maxIndexesContext.forEach(function (item) {
                    possibleQuestions.push(contextList[item.indexContext].defaultQuestion);
                });
                console.log(possibleQuestions);

                answer.menu = JSON.stringify({
                    keyboard: [
                        possibleQuestions
                    ]
                });
                answer.text = 'Возможно вы имели ввиду варианты из списка?';
            } else if (maxIndexesContext.length == 1) {//Если вариант единственно найденный
                var index = maxIndexesContext[0].indexContext;
                answer.text = contextList[index].answers[0].message;
                answer.menu = JSON.stringify({
                    keyboard: [
                        ['Ответ на заданный вопрос неверный'],
                        ['Меню']
                    ]
                });
            }
            resolve(answer);

            //Сохранение в БД заданного вопроса
            /*saveQuestion({
             message: currMessage,
             answer: answer,
             possibleContext: [],
             recognize: 'positive'
             });*/
        }

        function saveQuestion(obj) {
            mongod.collection("questionStats").insert({
                message: obj.currMessage,
                answer: obj.answer,
                possibleContext: obj.possibleContext,
                recognize: possibleContext.recognize
            });
        }


    };

    return {
        getQuestionsContext: getQuestionsContext
    };
});

module.exports = questionsContext;