import Label from "../models/label";
import { Request, Response } from "express";
import {responseHttp} from "../helpers/helpers";

export const saveLabel=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const newLabel=new Label({...data});
        const labelCreated=await newLabel.save();
        if(!labelCreated){
            return res.status(400).json(responseHttp(400,false,"Error el crear la etiqueta"));
        }
        return res.status(200).json(responseHttp(200,true,"Etiqueta creada correctamente",labelCreated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneLabel =async (req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        const labelFound=await Label.findOne({_id:id});
        return res.status(200).json(responseHttp(200,true,"Etiqueta encontrada",labelFound));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateLabel=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const newData=req.body;
        await Label.updateOne({_id:id},{...newData});
        const labelUpdated=await Label.findOne({_id:id});
        return res.status(200).json(responseHttp(200,true,"Etiqueta editada correctamente",labelUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteLabel=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const labelDeleted=await Label.findByIdAndDelete({_id:id});
        if(!labelDeleted){
            return res.status(400).json(responseHttp(400,false,"Error el eliminar la etiqueta"));
        }
        return res.status(200).json(responseHttp(200,true,"Etiqueta eliminada"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllLabels=async (req:Request,res:Response)=>{
    try{
        const allLabels=await Label.find();
        return res.status(200).json(responseHttp(200,true,"Todas las Etiquetas",allLabels));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}