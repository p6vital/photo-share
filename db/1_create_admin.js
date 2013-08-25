var User = require('../model/user');

module.exports = function (callback) {
    console.log('creating admin user');

    var admin = new User();
    admin.name = 'admin';
    admin.email = 'p6vital@gmail.com';
    admin.gender = 'M';
    admin.api_keys = [{api_key: 'xxx'}];

    admin.save(function (error, admin) {
        if (error) {
            throw new Error(error);
        }

        callback();
    });
}

