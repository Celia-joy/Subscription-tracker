import mongoose from 'mongoose'
 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'User name is required'],
        trim:true,
        minLength:6,
        maxLength:100
    },
    email:{
        type:String,
        required:[true, 'User email is required'],
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:100,
    }
 },{timestamps:true });
 const User =  mongoose.model('User', userSchema);

 export default User;