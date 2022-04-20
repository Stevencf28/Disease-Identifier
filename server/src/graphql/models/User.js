// Load the module dependencies
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { saltRounds } from '../../config/index';

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address."]
    },
    firstName: String,
    lastName: String,
    phone: String,
    type: String,
    password: {
        type: String,
        required: 'Password is required'
    }
});

// encrypt password before saving
UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// check if password is identical
UserSchema.methods.authenticate = function(password, hash) {
	return bcrypt.compareSync(password, hash);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

const Model = mongoose.model('User', UserSchema);

export default Model;