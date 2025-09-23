import { catchAsyncErrors } from '../middlewares/catchAsyncError.js'
import ErrorHandler, { errorMiddleware } from '../middlewares/ErrorMiddlewares.js'
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


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler('All fields are required', 400));
    }

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
        return next(new ErrorHandler('Invalid email or password', 400));
    }

    const isPasswordMatched = await existingUser.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 400));
    }

    if (existingUser.role !== role) {
        return next(new ErrorHandler('User role not found', 400));
    }

    return res.status(200).json({
        success: true,
        message: 'User login successful'
    })
})
