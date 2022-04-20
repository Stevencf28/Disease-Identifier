import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var MotivationSchema = new Schema({
    tip: String
});

const Model = mongoose.mode('Motivation', MotivationSchema);

export default Model;