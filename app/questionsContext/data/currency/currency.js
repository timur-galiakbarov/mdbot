var currencyContext = (function () {
    var msg = '';

    var entryPoints = {
        minKeywords: 1,
        minAdditions: 0,
        keywords:["валюта", "курс", "доллар", "евро"],
        additions:["цена", "я"]
    };

    var answers = [
        '*Данные актуальны на 17.01.2016*\n\n' +
        '*Доллар* \n• Покупка 77.62 RUB\n• Продажа 80.05 RUB\n' +
        '*Евро* \n• Покупка 81.15 RUB\n• Продажа 87.30 RUB\n' +
        '\n' +
        '✅ Более точные данные на официальном сайте Modulbank'
    ];

    function getAnswer(msg) {
        var ansCount = answers.length - 1;
        return {
            answer: answers[Math.floor(Math.random() * (ansCount + 1))],
            menu: JSON.stringify({
                keyboard: [
                    ['Меню']
                ]
            })
        };
    }

    return {
        getAnswer: getAnswer,
        initData: function () {

            return {
                type: 'currency',
                questions: entryPoints
            }
        }
    };
})();

module.exports = currencyContext;