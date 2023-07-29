//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SubjectSchema = new Schema({
    id: ObjectId,
    idSubject: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
        default: 3,
    },
},
    {
        collection: 'Subject',
    }

);

//export model
module.exports = mongoose.model.subject || mongoose.model(
    'Subject', //model name on mongodb
    SubjectSchema //model name on mongoose
    );