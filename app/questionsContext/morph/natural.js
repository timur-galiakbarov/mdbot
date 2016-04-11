var naturalModule = require('natural'),
    porterStemmer = naturalModule.PorterStemmerRu,
    classifier = new naturalModule.BayesClassifier(porterStemmer);

var natural = (function(){
    var init = function (){
        classifier.addDocument('Как создать платеж', 'платеж');
        classifier.addDocument('Как создать платеж2', 'платеж');
        classifier.addDocument('Как создать налоговый платеж', 'налоговый платеж');
        classifier.addDocument('тарифы', 'тарифы');
        classifier.train();

        console.log(classifier.classify('тарифы'));
        console.log(classifier.getClassifications('тарифы'));
        console.log(classifier.classify('как создать платежку?'));
        console.log(classifier.getClassifications('как создать платежку?'));
        console.log(classifier.classify('создание платежки?'));
        console.log(classifier.getClassifications('создание платежки?'));
        console.log(classifier.classify('Нужно создать налоговый платеж'));
        console.log(classifier.getClassifications('Нужно создать налоговый платеж'));
        console.log(classifier.classify('Как создать налоговый платеж'));
        console.log(classifier.getClassifications('Как создать налоговый платеж'));
        console.log(classifier.classify('показать информацию по тарифам'));
        console.log(classifier.getClassifications('показать информацию по тарифам'));

        console.log(classifier.classify('налоговый платеж'));
        console.log(classifier.getClassifications('налоговый платеж'));
        console.log(classifier.classify('фигня'));
        console.log(classifier.getClassifications('фигня'));
        /*classifier.addDocument('создать платеж', 'создание платежа');
        classifier.addDocument('создание платежа', 'создание платежа');
        classifier.addDocument('создание платежки', 'создание платежа');
        classifier.addDocument('создать платежку', 'создание платежа');
        classifier.addDocument('мне надо создать платежку', 'создание платежа');
        classifier.addDocument('создание налогового платежа', 'создание налогового платежа');
        /!*classifier.addDocument('short gold', 'sell');
        classifier.addDocument('sell gold', 'sell');*!/

        classifier.train();

        console.log(classifier.classify('создать платеж'));
        console.log(classifier.classify('создать налоговый платеж'));
        console.log(classifier.getClassifications('создать платеж'));*/


        /*console.log(porterStemmer.stem("создать"));
        console.log(porterStemmer.stem("создавать"));
        console.log(porterStemmer.stem("создание"));
        console.log(porterStemmer.stem("создай"));*/
    };

    return {
        init: init
    };
});

module.exports = natural;