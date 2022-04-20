// Load the module dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var PatientDailyInfoSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Patient is required'
    },
    temperature: String,
    heartRate: String,
    weight: String,
    bloodPressure: String,
    respiratoryRate: String,
    measuredDate: String
});

module.exports = mongoose.model('PatientDailyInfo', PatientDailyInfoSchema);