
import app from "./app.js";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secrate: process.env.CLOUDINARY_API_SECRATE
})
const PORT = process.env.PORT || 8000
app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});

