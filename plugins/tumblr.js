var NerdieInterface = require('nerdie_interface.js');
var oauth = require('oauth-client');

var nerdie;
var enabled = true;
var consumer_key;
var consumer_secret;
var oauth_token;
var oauth_token_secret;
var bot;
var nerdie;
var config;

function Tumblr (parentNerdie) {
    this.pluginInterface = new NerdieInterface(parentNerdie, this);
    if (!parentNerdie.config.plugins.tumblr) {
        enabled = false;
        return;
    };

    if (parentNerdie.config.plugins.tumblr.auth) {
        consumer_key = parentNerdie.config.plugins.tumblr.auth.consumer_key;
        consumer_secret = parentNerdie.config.plugins.tumblr.auth.consumer_secret;
        oauth_token = parentNerdie.config.plugins.tumblr.auth.oauth_token;
        oauth_token_secret = parentNerdie.config.plugins.tumblr.auth.oauth_token_secret;
    };

    bot = parentNerdie.bot;
    nerdie = parentNerdie;
    config = parentNerdie.config;
}


Tumblr.prototype.init = function () {

    var plugin = this;
    if (!enabled) {
        return;
    };

    this.pluginInterface.registerPattern(
        this.pluginInterface.anchoredPattern('post', true),
        postHandler
    );

    checkPosts();

};

/*
var postHandler = function (msg) {
    var txt = msg.match_data[2];
    var description = txt.substr(txt.indexOf(0, txt.indexOf('http://') || txt.indexOf('https://')));
    //var image = txt.substr(txt.indexOf());
    console.log('it works');
};

var sendPost = function (post) {
    // Send post to tumblr.
};

var checkPosts  = function () {
    // Checks for new posts.
    console.log('checkPosts');
};

var getPosts = function () {

    var api_key = consumer_key;

    var consumer = oauth.createConsumer(consumer_key, consumer_secret);
    var token = oauth.createToken(oauth_token, oauth_token_secret);
    var signer = oauth.createHmac(consumer, token);

    var request = {
        port: 443,
        host: 'api.tumblr.com',
        https: true,
        path: '/v2/blog/fictivewall.tumblr.com/posts?api_key=' + api_key,
        oauth_signature: signer,
        method: 'GET'
    };

    var request = oauth.request(request, function(response) {
        response.setEncoding('utf8');
        data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function() {
            console.log(JSON.parse(data));
        });
    });

    request.write('');
    request.end();

};*/