// Load the module dependencies
import mongoose from 'mongoose';

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

const Model = mongoose.model('PatientDailyInfo', PatientDailyInfoSchema);

export default Model;