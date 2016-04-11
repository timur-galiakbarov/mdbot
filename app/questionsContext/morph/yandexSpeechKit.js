var yandexSpeechKit = (function (config, promise, request) {
    var key = config.yandexSpeechKitKey;
    var requestURI = 'https://vins-markup.voicetech.yandex.net/markup/0.x/';
    var options = 'Morph';

    var getMorph = function (message) {
        var q = new promise(function (resolve, reject){
            request.get(requestURI, {
                qs: {
                    text: message,
                    key: key,
                    layers: options
                },
                json: true
            }, function (error, response, body) {
                console.log(body);
                if (response.statusCode == 200) {
                    resolve(body)
                }
                else reject();
            });
        });
        return q;
    };
    return {
        getMorph: getMorph
    }
});
module.exports = yandexSpeechKit;