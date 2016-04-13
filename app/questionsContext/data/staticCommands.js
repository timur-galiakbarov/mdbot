var promise = require('promise');

var staticCommands = (function (mongod) {

    var resolve,
        reject,
        Q;

    function createPromise() {
        return new promise(function (promiseResolve, promiseReject) {
            resolve = promiseResolve;
            reject = promiseReject;
        });
    }

    var commands = {
        "/start": function () {
            Q = createPromise();
            resolve({
                text: "Здравствуйте! я бот модульбанк.\nНачните диалог со мной",
                menu: JSON.stringify({
                    keyboard: [
                        ['Что может бот?'],
                        ["Чего не может бот?"]
                    ]
                })
            });
            return Q;
        },
        "меню": function () {
            Q = createPromise();
            resolve({
                text: "Моё меню",
                menu: JSON.stringify({
                    keyboard: [
                        ['Что может бот?'],
                        ["Чего не может бот?"]
                    ]
                })
            });
            return Q;
        },
        "что может бот?": function () {
            Q = createPromise();
            mongod.collection("context").find().toArray().then(function (res) {
                var contextList = "";
                console.log(res);
                res.forEach(function (context) {
                    contextList += context.title + "\n";
                });
                resolve({
                    text: "Я расскажу всё о Модульбанке, что знаю.\n" +
                    "Вы можете задавать вопросы, я постараюсь понять о чем вы спрашиваете и ответить максимально точно\n" +
                    "Я могу не знать некоторые вещи, если не знаю, то запишу себе на будущее и узнаю.\nМой мозг постоянно совершенствуется\n\n" +
                    "У вас есть вопросы по работе с банком? Спрашивайте - постараюсь ответить\n\n" +
                    "Пока мозги небольшие я приведу список вопросов, на которые могу ответить:\n" +
                    contextList
                });
            });
            return Q;
        },
        "чего не может бот?": function () {
            Q = createPromise();
            resolve({
                text: "Я не выполняю действия: не провожу платежи, не сообщаю остатки, не меняю пароли, не скачиваю выписки и не занимаюсь спам-рассылкой.\nНикак не могу навредить/нагрубить клиентам модульбанка",
            });
            return Q;
        },
        "ответ на заданный вопрос неверный": function () {
            Q = createPromise();
            resolve({
                text: "Извините, я запишу себе ваш вопрос и обдумаю правильность ответа на досуге."
            });
            return Q;
        }
    };
    return commands;
});

module.exports = staticCommands;