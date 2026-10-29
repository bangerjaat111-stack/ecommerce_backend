import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },    
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderdate:{  type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' }
},
    {timestamps: true}
)

export const orderModel = mongoose.model('order', orderSchema) 