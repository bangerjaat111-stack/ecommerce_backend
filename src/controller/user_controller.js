import {errorhandling} from '../error/allerror.js'

export const createuser=async(req,res)=>{
    try {
        res.send({a:"api"})
    } 
    catch (err) { errorhandling(err, res)}
} 