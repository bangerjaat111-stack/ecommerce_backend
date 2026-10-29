import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { routes } from './routes/mainroutes.js'

dotenv.config({quite: true})

const PORT = process.env.PORT || 5000
const app =express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
	
})
app.use(limiter)
app.use(express.json())
app.use(cors())
app.use('/api',routes)


mongoose.connect(process.env.MONGODBURL)
    .then(() => {console.log('Connected to MongoDB')})
    .catch((error) => { console.error('Error connecting to MongoDB:', error)})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})

 