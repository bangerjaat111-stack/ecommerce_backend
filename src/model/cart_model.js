import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },    
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
},
    {timestamps: true}
)

export const cartModel = mongoose.model('cart', cartSchema) 