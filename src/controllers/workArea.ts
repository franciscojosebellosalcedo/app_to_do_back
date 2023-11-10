import WorkArea from "../models/workArea";
import { Request, Response } from "express";
import {responseHttp } from "../helpers/helpers";

export const addNewMember=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const workAreaFound=await WorkArea.findOne({_id:id});
        const membersWorkArea=workAreaFound?.members;
        membersWorkArea?.push(data.member);
        await WorkArea.updateOne({_id:id},{members:membersWorkArea});
        const workAreaUpdated=await WorkArea.findOne({_id:id}).populate(["user","members"]);
        return res.status(200).json(responseHttp(200,true,"Miembro agregado correctamente",workAreaUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const saveWorkArea=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const newWorkArea=new WorkArea({...data});
        const workAreaCreated= await (await newWorkArea.save()).populate(['user','members']);
        if(!workAreaCreated){
            return res.status(400).json(responseHttp(400,false,"Error al crear el area de trabajo"));
        }
        return res.status(200).json(responseHttp(200,true,"Area de trabajo creado correctamente",workAreaCreated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateWorkArea=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const newData=req.body;
        const responseUpdated=await WorkArea.updateOne({_id:id},{...newData});
        if(responseUpdated.modifiedCount>0){
            const workAreaUpdated=await WorkArea.findOne({_id:id}).populate(["user","members"]);
            return res.status(200).json(responseHttp(200,true,"Area de trabajo actualizado",workAreaUpdated));
        }
        return res.status(400).json(responseHttp(400,false,"Error al actualizar el area de trabajo"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneWorkArea=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const workAreaFound=await WorkArea.findOne({_id:id}).populate(["user","members"]);
        return res.status(200).json(responseHttp(200,true,"Area de trabajo encontrada",workAreaFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllWorksArea=async (req:Request,res:Response)=>{
    try{
        const allWorksArea=await WorkArea.find().populate(['members','user']);
        return res.status(200).json(responseHttp(200,true,"Todas las areas de trabajo",allWorksArea));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteWorkArea = async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const workAreaDeleted=await WorkArea.findByIdAndDelete({_id:id});
        if(!workAreaDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar esta area de trabajo"));
        }
        return res.status(200).json(responseHttp(200,true,"Area de trabajo eliminada"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}