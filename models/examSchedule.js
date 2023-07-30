//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ExamScheduleSchema = new Schema({
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
    date: {
        type: Date, //yyyy-mm-dd
        required: true,
    },
    shift: {
        type: Number,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
},
    {
        collection: 'ExamSchedule',
    }
);

//export model
module.exports = mongoose.model.examSchedule || mongoose.model(
    'ExamSchedule', //model name on mongodb
    ExamScheduleSchema //model name on mongoose
);