import mongoose from 'mongoose';
import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN} from '../config/env.js';
import {JWT_SECRET} from '../config/env.js';
//A req.body is an object containing data from the client
export const signUp = async (req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User already exists');
            res.statusCode = 409;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name, email, password:hashedPassword}], {session});
        const token = await jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
         await session.commitTransaction();
         session.endSession();
         res.status(201).json({
            success: true,
            message:'User created successfully',
            data:{
                token,
                user:newUsers[0]
            }
         });
    }
    catch (error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async(req, res, next)=>{

}
export const signOut = async (req, res, next)=>{

}
