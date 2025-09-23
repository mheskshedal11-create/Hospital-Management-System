import express from 'express'
import { login, patientRegister } from '../controller/user.controller.js'
const userRouter = express.Router()

userRouter.post('/patient/register', patientRegister)
userRouter.post('/patient/login', login)

export default userRouter