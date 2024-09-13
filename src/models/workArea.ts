import mongoose from "mongoose";

const workAreaSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
    },
    name:{
        type:String,
    },
    type:{
        type:String,
        enum:["Educación","Empresarial","Personal","Otro"],
    },
    description:{
        type:String,
    },
    boards:{
        type:[]
    },
},{timestamps:true});

const WorkArea= mongoose.model("WorkArea",workAreaSchema);
export default WorkArea;