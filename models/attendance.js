//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AttendanceSchema = new Schema({
    id: ObjectId,
    student_id: {
        type: ObjectId,
        required: true,
        // khóa ngoại với bảng student
        ref: 'Student',
    },
    subject_id: {
        type: ObjectId,
        required: true,
        ref: 'Subject',
    },
    count: {
        type: Number,
        required: true,
    },
    term: {
        type: String,
        required: true,
        default: 'No term',
    },
},
    {
        collection: 'Attendance',
    }
);

//export model
module.exports = mongoose.model.attendance || mongoose.model(
    'Attendance', //model name on mongodb
    AttendanceSchema //model name on mongoose
);