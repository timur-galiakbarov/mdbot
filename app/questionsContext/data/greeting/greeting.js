var greetingContext = (function () {
    var msg = '';

    var entryPoints = {
        minKeywords: 1,
        minAdditions: 0,
        keywords:["здравствовать", "привет", "хай", "салют", "добрый", "приветствие"],
        additions:["бот", "модульбанк", "день"]
    };

    var answers = [
        "Приветствую Вас", "Здравствуйте", "Добрый день"
    ];

    function getAnswer(msg) {
        var ansCount = answers.length - 1;
        return {
            answer: answers[Math.floor(Math.random() * (ansCount + 1))],
            menu: ''
        };
    }

    return {
        getAnswer: getAnswer,
        initData: function () {

            return {
                type: 'greeting',
                questions: entryPoints
            }
        }
    };
})();

module.exports = greetingContext;