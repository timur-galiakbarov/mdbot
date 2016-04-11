var config = require('./../config.js');
var mongoClient = require('mongodb').MongoClient;
var telegramClient = require('./clients/telegram.js');

var questionsContext = require('./questionsContext/questionsContext.js')(mongoClient);

mongoClient.connect(config.dbconn, function (err, db) {
    if (err) {
        throw err;
    }
});

var app = (function () {

    var init = function () {
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