//mongoose model for category
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BranchSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true,
        default: 'No name'
    },
    backGround: {
        type: String,
        default: 'No background'
    },
},
    {
        collection: 'Branch',
    }
);

//export model
module.exports = mongoose.model.branch || mongoose.model(
    'Branch', //model name on mongodb
    BranchSchema //model name on mongoose
);