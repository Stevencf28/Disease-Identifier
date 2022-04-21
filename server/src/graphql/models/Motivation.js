import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var MotivationSchema = new Schema({
    tip: String
});

const Model = mongoose.model('Motivation', MotivationSchema);

export default Model;