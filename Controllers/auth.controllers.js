
import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

import sendWelcomeEmail from '../utils/emails.js';

export const signUp = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            const error = new Error('Name, email and password are required');
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log(existingUser);
            const error = new Error('User already existiylfyigiy');
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [newUser] = await User.create(
            [{ name, email, password: hashedPassword }],

        );



        // await session.commitTransaction();
        // session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {

                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            }
        });
        await sendWelcomeEmail(email, name);


    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        next(error);
    }
};
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        // Important: include password field (in case select: false in schema)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN || "1d" }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    // For JWT: usually just client deletes token
    // If using refresh tokens or sessions → implement blacklisting here
    res.status(200).json({
        success: true,
        message: 'Signed out successfully'
    });
};