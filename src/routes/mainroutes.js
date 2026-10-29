import express from 'express'
import {userroutes} from './user_routes.js'
import {adminroutes} from './adminroutes.js'
export const routes=express.Router()

routes.use('/user', userroutes)
routes.use('/admin', adminroutes)
