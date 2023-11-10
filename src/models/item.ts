import mongoose from "mongoose";

const itemSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    checkList:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "CheckList"
    }
},{timestamps:true});

const Item= mongoose.model('Item',itemSchema);
export default Item;