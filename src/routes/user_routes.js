import express from 'express'
import { createuser } from '../controller/user_controller.js'
export const userroutes=express.Router()

userroutes.get('/createuser',createuser)

