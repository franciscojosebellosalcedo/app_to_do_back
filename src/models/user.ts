import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    token:{
        type:String,
    }
},{timestamps:true});

const User= mongoose.model('User',userSchema);
export default User;