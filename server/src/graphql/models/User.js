// Load the module dependencies
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: 'Username is required',
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    firstName: String,
    lastName: String,
    phone: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address."]
    },
    type: String
});

// encrypt password before saving
UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// check if password is identical
UserSchema.methods.authenticate = function(password) {
	return this.password === bcrypt.hashSync(password, saltRounds);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

const Model = mongoose.model('User', UserSchema);

export default Model;