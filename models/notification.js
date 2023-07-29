//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var NotificationSchema = new Schema({
    id: ObjectId,
    title: {
        type: String,
        required: true,
        default: 'No title',
    },
    content: {
        type: String,
        default: 'No content',
    },
    author: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    date: {
        type: Date,
        required: true,
    },
},
    {
        collection: 'Notification',
    }
);

//export model
module.exports = mongoose.model.notification || mongoose.model(
    'Notification', //model name on mongodb
    NotificationSchema //model name on mongoose
    );