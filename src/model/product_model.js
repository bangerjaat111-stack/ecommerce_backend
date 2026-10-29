import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const productSchema = new mongoose.Schema({

    productImg: { type: Array, required: true },
    productName: { type: String, required: true },
    productdescription: { type: String, required: true },
    bankoffer:[

    ],

    quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
    commentid: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false },
    category:{type: String, required: true},
    info: {},


},
    {timestamps: true}
)

export const productModel = mongoose.model('Product', productSchema) 