import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: (v) => /^[0-9]{7,10}$/.test(v),
            message: "Please provide a valid phone number"
        }
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minLength: [10, "Message should be at least 10 characters long"]
    }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
