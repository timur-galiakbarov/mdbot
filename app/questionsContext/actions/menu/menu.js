var config = require('./../../../../config.js');
var telegramBot = require('node-telegram-bot-api');

var menu = (function (bot, chatId){
    var showMenu = function(){

        var menu = [
            ["Меню 1", "Меню 2"],
            ["Меню 3", "Меню 4"]
        ];

        bot.sendMessage(
            chatId,
            "Пожалуйста, смотрите:",
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