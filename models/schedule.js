//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ScheduleSchema = new Schema({
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
    description: {
        type: String,
        default: 'trống',
    },
    teacher: {
        type: String,
        required: true,
        default: 'đang cập nhật',
    },
    class: {
        type: String,
        required: true,
    },
    exemption: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Number,
        default: 0,
    },
    room: {
        type: String,
        default: 'đang cập nhật',
    },
    shift: {
        type: Number,
    },
    date: {
        type: Date,
        required: true,
    },
    numberOfSession: {
        type: Number,
        required: true,
        default: 17,
    },
},
    {
        collection: 'Schedule',
    }
);

//export model
module.exports = mongoose.model.schedule || mongoose.model(
    'Schedule', //model name on mongodb
    ScheduleSchema //model name on mongoose
);