var User = require('../model/user');

exports.list = function(req, res) {
    User.find(function(err, users) {
        res.send(users);
    });
}

exports.create=function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var user = new User(req.params);
    user.save(function(error, user) {
        if (error) {
            return next(new restify.InvalidArgumentError(JSON.stringify(error)));
        }

        res.send(201, user)
    })
}