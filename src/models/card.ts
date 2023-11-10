import mongoose from "mongoose";

const cardSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true 
    },
    description:{
        type:String,
        trim:true 
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    labels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Label"
    }],
    list:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
},{timestamps:true});

const Card=mongoose.model("Card",cardSchema);
export default Card;