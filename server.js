var restify = require('restify');
var mongoose = require('mongoose');

var config = require("./config/config");
var db_migrator = require("./initialize/db_migrator");

var user = require('./service/user');

//Connect db
mongoose.connect(config.mongodb.getURI());
// Run db migration
db_migrator.start(startServer);

function startServer() {
    // Create server
    var server = restify.createServer({
        name: 'server'
    });
    server.use(restify.fullResponse());
    server.use(restify.bodyParser());

    //specify route
    server.get('/user', user.list);
    server.post('/user', user.create);

    server.listen(process.env.PORT, function () {
        console.log('%s listening at %s', server.name, server.url)
    });
}



