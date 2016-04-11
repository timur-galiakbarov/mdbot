var authModule = (function (mongod){
    var checkAuth = function (cookie) {
        var isAuth = false;
        if (cookie && cookie.modulbankBotToken){
            mongod.collection("userSessions").find({
                token: cookie.modulbankBotToken
            });
        }
    };
    return {
        checkAuth: checkAuth
    }
});

module.exports = authModule;