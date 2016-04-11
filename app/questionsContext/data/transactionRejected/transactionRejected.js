var transactionRejectedContext = (function () {
    var msg = '';

    var entryPoints = {
        minKeywords: 2,
        minAdditions: 1,
        keywords:["не", "транзакция"],
        additions:["проходить", "отправляться", "происходить", "отклонять", "отменять", "выполнять"]
    };

    var answers = [
        "Для решения данного вопроса вам необходимо обратиться к бизнес-ассистену команды Модульбанк.\n" +
        "Сообщите ассистенту ваш ОГРН/ОГРНИП\n" +
        "Используйте пункт меню \"Начать диалог с ассистентом\", вам ответят в ближайшее время"
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
            console.log("init");
            return {
                type: 'transactionRejected',
                questions: entryPoints
            }
        }
    };
})();

module.exports = transactionRejectedContext;