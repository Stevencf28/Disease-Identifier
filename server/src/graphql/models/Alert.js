// Load the module dependencies
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var AlertSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'PatientID is required'
    },
    message: String
});

const Model = mongoose.model('Alert', AlertSchema);

export default Model;