// Load the module dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var AlertSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Patient is required'
    },
    message: String
});

module.exports = mongoose.model('Alert', AlertSchema);