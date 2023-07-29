//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TranscriptSchema = new Schema({
    id: ObjectId,
    student_id: {
        type: ObjectId,
        required: true,
        ref: 'Student',
    },
    subject_id: {
        type: ObjectId,
        required: true,
        ref: 'Subject',
    },
    term: {
        type: String,
    },
    mark: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 1,
    },
},
    {
        collection: 'Transcripts',
    }
);

//export model
module.exports = mongoose.model.transcript || mongoose.model(
    'Transcript', //model name on mongodb
    TranscriptSchema //model name on mongoose
);