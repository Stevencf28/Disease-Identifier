import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MotivationSchema = new Schema({
    content: String,
    type: String,
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Patient is required'
    },
});

const Model = mongoose.model('Motivation', MotivationSchema);

export default Model;