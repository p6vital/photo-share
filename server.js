var config = require("./config/config");

var restify = require('restify');
var server = restify.createServer({
    name: 'my-api'
}).use(restify.fullResponse()).use(restify.bodyParser());

var mongoose = require('mongoose');
mongoose.connect(config.mongodb.getURI());

var User = require('./models/user');

server.get('/user', function(req, res, next) {
    User.find(function(err, users) {
        res.send(users);
    });
});

server.post('/user', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var user = new User(req.params);
    user.save(function(error, user) {
        if (error) {
            return next(new restify.InvalidArgumentError(JSON.stringify(error)));
        }

        res.send(201, user)
    })
})

server.listen(process.env.PORT, function() {
    console.log('%s listening at %s', server.name, server.url)
})
