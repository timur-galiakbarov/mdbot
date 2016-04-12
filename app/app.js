var config = require('./../config.js');
var telegramClient = require('./clients/telegram.js');

var questionsContext;


/*console.log(config.dbconn);
mongoClient.connect(config.dbconn, function (err, db) {
    if (err) {
        throw err;
    }
});*/

var app = (function () {

    var init = function (mongod) {
        questionsContext = require('./questionsContext/questionsContext.js')(mongod);
        telegramClient.initBot(getAnswer);
    };
    var sendMessage = function (){

    };

    /*private
    * */
    var getAnswer = function (msg) {
        return questionsContext.getQuestionsContext(msg);
    };

    return {
        init: init,
        sendMessage: sendMessage
    };

})();

module.exports = app;