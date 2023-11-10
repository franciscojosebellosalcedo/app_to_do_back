import CheckList from "../models/checkList";
import { Request, Response } from "express";
import {responseHttp} from "../helpers/helpers";

export const saveCheckList=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const newCheckList=new CheckList({...data});
        const checkListCreated=await (await newCheckList.save()).populate(["card"]);
        if(!checkListCreated){
            return res.status(400).json(responseHttp(400,false,"Error al crear el checklist"));
        }
        return res.status(200).json(responseHttp(200,true,"Checklist creado correctamente",checkListCreated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneCheckList=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const checkListFound=await CheckList.findOne({_id:id}).populate(["card"]);
        return res.status(200).json(responseHttp(200,true,"Checklist encontrado",checkListFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateCheckList=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const newData=req.body;
        await CheckList.updateOne({_id:id},{...newData});
        const checkListUpdated=await CheckList.findOne({_id:id}).populate(["card"]);
        return res.status(200).json(responseHttp(200,true,"Checklist editado",checkListUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteCheckList=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const checkListDeleted=await CheckList.findByIdAndDelete({_id:id});
        if(!checkListDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar el checklist"));
        }
        return res.status(200).json(responseHttp(200,true,"Checklist eliminado"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllCheckLists=async (req:Request,res:Response)=>{
    try{
        const allCheckLists=await CheckList.find().populate(["card"]);
        return res.status(200).json(responseHttp(200,true,"Todos los checklist",allCheckLists));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}