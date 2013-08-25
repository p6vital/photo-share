var fs = require('fs');

var Migration = require('../model/db_migration');

exports.start = function (callback) {
    Migration.find({}, null, {sort: {date: -1}}, function (err, migrations) {
        if (err) {
            throw new Error(err);
        }

        var last_version = 0;
        if (migrations && migrations.length > 0) {
            last_version = migrations[0].version;
        }
        console.log('Current DB version: ' + last_version);

        var script_files = fs.readdirSync('./db/');
        var scripts = {};
        var order = [];
        for (var i = 0; i < script_files.length; i++) {
            var script_file = script_files[i];
            var version = script_file.split('_')[0];
            if (version > last_version) {
                scripts[version] = script_file;
                order.push(version);
            }
        }
        order.sort(function (a, b) {
            return a - b;
        });

        migrate(scripts, order, callback);
    });
}

function migrate(scripts, order, callback) {
    if (order.length == 0) {
        console.log('DB migration ended');
        return callback();
    }

    var version = order[0];
    console.log('Running ' + scripts[version] + '...');
    var run = require('../db/' + scripts[version]);
    run(function(){
        var migration = new Migration({version: version, date: new Date(), name: scripts[version]});
        migration.save(function (error, migration) {
            if (error) {
                throw new Error(error);
            }
            console.log('Done.');

            // Remove executed script
            delete scripts[order.shift()];

            // Call itself recursively to ensure the order
            migrate(scripts, order, callback);

        });
    });
}


