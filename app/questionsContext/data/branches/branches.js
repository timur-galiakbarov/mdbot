var branchesContext = (function () {
    var msg = '';

    var entryPoints = {
        minKeywords: 1,
        minAdditions: 0,
        keywords:["отделение", "банкомат"],
        additions:["близкий", "модульбанк", "где", "находить"]
    };

    var answers = [
        '*Москва *\nПресненская наб., 8, стр. 1, ТЦ Город Столиц, эт. 2\nежедневно с 09:00 до 21:00, кроме Вс\n\n' +
        '*Уфа*\nЧернышевского, 82\nежедневно с 09:00 до 18:00, кроме Сб Вс\n\n' +
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
                type: 'branches',
                questions: entryPoints
            }
        }
    };
})();

module.exports = branchesContext;