import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import Message from "../models/message.model.js";
import ErrorHandler from '../middlewares/ErrorMiddlewares.js'
export const sendMessage = catchAsyncErrors(async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !phone || !message) {
            return next(new ErrorHandler('all field are required', 400))
        }

        // Save message to DB
        const newMessage = await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.error("Error sending message:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
});
