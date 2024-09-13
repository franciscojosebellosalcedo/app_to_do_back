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
    checkList:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "CheckList"
    }
},{timestamps:true});

const Item= mongoose.model('Item',itemSchema);
export default Item;