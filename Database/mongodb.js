import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';
import dotenv from 'dotenv';
dotenv.config();

if (!DB_URI){
    throw new Error('Please specify the MONGO DB_URI environment variable inside .env<development/production>.local');
}

const connectToDatabase = async () =>{
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV}`);

    }
    catch (error){
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}
 export default connectToDatabase;


