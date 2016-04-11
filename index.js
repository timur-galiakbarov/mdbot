var express = require('express');
var mongo_express = require('./node_modules/mongo-express/lib/middleware.js');
var mongo_express_config = require('./node_modules/mongo-express/config.default.js');
var cookieParser = require('cookie-parser');
var mongoClient = require('mongodb').MongoClient;
var config = require('./config.js');
/*APP*/
var app = express();
var route = require('./adminApp/route.js');
var authModule = require('./adminApp/auth/authModule');
var tgBot = require('./app/app.js');
/*---------------------*/
var adminApp = (function () {
    var modules = {};
    var mongod;//Клиент для работы с БД
    var init = function () {
        //Коннект с БД
        mongoClient.connect(config.dbconn, function (err, db) {
            if (err)
                return;
            mongod = db;
        });
        /*Инициализация админ панели*/
        app.use(cookieParser('secret'));
        modules.auth = new authModule(mongod);
        /*Маршрутизация---------------------------------*/
        modules.route = new route(app, mongo_express, mongo_express_config, express,  __dirname, modules.auth);
        app.listen(app.get('port'), function () {
            console.log('Node app is running on port', app.get('port'));
        });
        /*Инициализация Telegram-бота*/
        tgBot.init();
    };

    return {
        init: init
    }
})();

adminApp.init();