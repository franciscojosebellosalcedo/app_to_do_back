import mongoose from "mongoose";

const labelSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true 
    },
    color:{
        type:String
    }
},{timestamps:true});

const Label=mongoose.model("Label",labelSchema);
export default Label;