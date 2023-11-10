import mongoose from "mongoose";

const checkListSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    card:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Card"
    }
},{timestamps:true});

const CheckList= mongoose.model('CheckList',checkListSchema);
export default CheckList;