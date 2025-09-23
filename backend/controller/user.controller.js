import { catchAsyncErrors } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/ErrorMiddlewares.js'
import User from '../models/user.model.js'

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, nic, role, dob } = req.body

    if (!firstName || !lastName || !email || !phone || !password || !gender || !nic || !role || !dob) {
        return next(new ErrorHandler('All fields are required', 400))
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return next(new ErrorHandler('User already registered', 400))
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        nic,
        role,
        dob
    })

    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        newUser
    })
})
