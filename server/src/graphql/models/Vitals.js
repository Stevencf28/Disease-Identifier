// Load the module dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var VitalsSchema = new Schema({
    nurse: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Nurse is required'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Patient is required'
    },
    temperature: String,
    heartRate: String,
    bloodPressure: String,
    respiratoryRate: String,
    visitDate: String
});

module.exports = mongoose.model('Vitals', VitalsSchema);