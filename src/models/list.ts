import mongoose from "mongoose";

const listSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true 
    },
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Board"
    }
},{timestamps:true});

const List=mongoose.model("List",listSchema);
export default List;