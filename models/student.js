//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var StudentSchema = new Schema({
    id: ObjectId,
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
},
    {
        collection: 'Student',
    }
);

//export model
module.exports = mongoose.model.student || mongoose.model(
    'Student', //model name on mongodb
    StudentSchema //model name on mongoose
);