var config = require('./../../config.js');
var telegramBot = require('node-telegram-bot-api');
var bot;
var chatId;

var initBot = function (messageHandler) {
    bot = new telegramBot(config.telegramToken, {polling: true});
    bot.on('message', function (msg) {
        if (!(msg && msg.chat && msg.chat.id))
            return;

        chatId = msg.chat.id;
        messageHandler(msg).then(function (result) {
            console.log(result.text);
            bot.sendMessage(
                chatId,
                result.text,
                {
                    parse_mode: "Markdown",
                    reply_markup: result.menu || {}
                });
        });
    });
};

module.exports = {
    initBot: initBot
};