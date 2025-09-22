import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dbConnection from './database/dbConnection.js'
dotenv.config()

const app = express()

import cookieParse from 'cookie-parser'
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParse())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnection()
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

export default app