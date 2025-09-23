import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Please provide a valid email"
        }
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: (v) => /^[0-9]{7,10}$/.test(v),
            message: "Please provide a valid phone number (7-10 digits)"
        }
    },
    nic: {
        type: String,
        required: [true, "NIC is required"],
        validate: {
            validator: (v) => /^[0-9]{10,20}$/.test(v),
            message: "Please provide a valid NIC number (10-20 digits)"
        }
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required"],
        minlength: [6, "Password should be at least 6 characters"],
        maxlength: [12, "Password should not be more than 12 characters"]
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', "patient", "Dcotor"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

userSchema.pre('save', async function name(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.method.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JTW_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

const User = mongoose.model('User', userSchema)

export default User
