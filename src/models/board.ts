import mongoose from "mongoose";

const boardSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true 
    },
    colorBackground:{
        type:String,
        trim:true
    },
    isFavorite:{
        type:Boolean,
        default:false
    },
    workArea:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'WorkArea'
    }
},{timestamps:true});

const Board=mongoose.model("Board",boardSchema);
export default Board;