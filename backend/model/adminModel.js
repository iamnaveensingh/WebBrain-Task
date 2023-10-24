import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";

// schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    type: {
        type: String,
        required: [true, 'Type is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [6, "min length should be grater than 6"]
    },
    
}, { timestamps: true })

// middlewares
userSchema.pre('save', async function () {
    if (!this.isModified("password")) { return };
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

//JSON wen token
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

// compare passowrd
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

export default mongoose.model('admin', userSchema)