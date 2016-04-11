var route = (function (app, mongo_express, mongo_express_config, express, dirname, auth){

    app.set('port', (process.env.PORT || 5050));

    app.use(express.static(dirname + '/public'));
    app.use('/mongo_express', mongo_express(mongo_express_config));

// views is directory for all template files
    app.set('views', dirname + '/views');
    app.set('view engine', 'ejs');

    app.get('/', function (request, response) {
        auth.checkAuth(request.cookies);
        response.render('pages/index');
    });

    app.get('/login/', function (request, response) {
        response.render('pages/login');
    });
});

module.exports = route;