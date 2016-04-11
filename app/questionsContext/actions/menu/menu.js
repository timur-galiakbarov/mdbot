var config = require('./../../../../config.js');
var telegramBot = require('node-telegram-bot-api');

var menu = (function (bot, chatId){
    var showMenu = function(){

        var menu = [
            ["���� 1", "���� 2"],
            ["���� 3", "���� 4"]
        ];

        bot.sendMessage(
            chatId,
            "����������, ��������:",
            {
                parse_mode: "Markdown",
                reply_markup: menu || {}
            });
    };

    return {
        showMenu: showMenu
    }
});

module.exports = menu;