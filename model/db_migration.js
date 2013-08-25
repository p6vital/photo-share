var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var migrationSchema = new Schema({
    id: ObjectId,
    version: {
        type: Number,
        min: 1
    },
    name: String,
    date: Date
});

module.exports = mongoose.model('Migration', migrationSchema);
