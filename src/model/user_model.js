import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    profileImage: { type: object, },
    firstName: { type: String, required: true },
    lastName: { type: String, },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [  
        {
            state: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: Number, required: true },
            street: { type: String, required: true },   
            landmark: { type: String, required: true },
            phone: { type: Number, required: true },

        }],
    isaddress: { type: Boolean, default: false },
    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
    orderid: { type: mongoose.Schema.Types.ObjectId, ref: 'order' },
    cartid: { type: mongoose.Schema.Types.ObjectId, ref: 'cart' },
    verification: {
        user: {
            isVerified: { type: Boolean, default: false },
            isdeleted: { type: Boolean, default: false },
            isBlocked: { type: Boolean, default: false },
            reason: { type: String, default: '' },
            otp: { type: Number, default: null },
            otpatm: { type: Number, default: 3 },
            locktime: { type: Date, default: null },
        },

        admin: {
            otp: { type: Number, default: null },
            otpatm: { type: Number, default: 3 },
        }


    },

    login_info: [{ login_info: { logintime: Date, devicename: string, location: Object },}]

},
    {timestamps: true}
)

export const userModel = mongoose.model('User', userSchema)