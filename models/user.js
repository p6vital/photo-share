var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true,
        validate: [{
            validator: function(value, respond) {
                if (value && value.length < 3) {
                    return respond(false);
                }

                respond(true);
            },
            msg: 'name is too short.'
        }, {
            validator: function(value, respond) {
                if (value && value.length > 50) {
                    return respond(false);
                }

                respond(true);
            },
            msg: 'name is too long.'
        }]
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('User', userSchema);
