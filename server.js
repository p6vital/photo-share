var config = require("./config/config");

var restify = require('restify');
var server = restify.createServer({
    name: 'my-api'
}).use(restify.fullResponse()).use(restify.bodyParser());

var mongoose = require('mongoose');
mongoose.connect(config.mongodb.getURI());

var user = require('./service/user');

server.get('/user', user.list);
server.post('/user', user.create);

server.listen(process.env.PORT, function() {
    console.log('%s listening at %s', server.name, server.url)
})
