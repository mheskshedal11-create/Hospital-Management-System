import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dbConnection from './database/dbConnection.js'
import messageRouter from './router/message.router.js'
import { errorMiddleware } from './middlewares/ErrorMiddlewares.js'
import cookieParse from 'cookie-parser'
import userRouter from './router/user.router.js'
dotenv.config()

const app = express()


app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParse())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)

dbConnection()
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.use(errorMiddleware)
export default app