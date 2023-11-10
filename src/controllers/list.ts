import List from "../models/list";
import { Request, Response } from "express";
import {responseHttp} from "../helpers/helpers";


export const saveList=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const newList=new List({...data});
        const listCreated=await (await newList.save()).populate(["board","cards"]);
        if(!listCreated){
            return res.status(400).json(responseHttp(400,false,"Error al crear la lista"));
        }
        return res.status(200).json(responseHttp(200,true,"Lista creada correctamente",listCreated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateList=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const newData=req.body;
        await List.updateOne({_id:id},{...newData});
        const listUpdated=await List.findOne({_id:id}).populate(["board","cards"]);
        if(!listUpdated){
            return res.status(400).json(responseHttp(400,false,"Error al editar la lista"));
        }
        return res.status(200).json(responseHttp(200,true,"Lista editada correctamente",listUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneList=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const listFound=await List.findOne({_id:id}).populate(["board","cards"]);
        return res.status(200).json(responseHttp(200,true,"Lista encontrada",listFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteList=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const listDeleted=await List.findOneAndDelete({_id:id});
        if(!listDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar la lista"));
        }
        return res.status(200).json(responseHttp(200,true,"Lista eliminada correctamente"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllList=async (req:Request,res:Response)=>{
    try{
        const allList=await List.find().populate([
            {
              path: 'board',
              populate: {
                path: 'workArea',
                populate: { path: 'members' }
              }
            },
            {
              path: 'cards',
              populate: [{ path: 'labels' }, { path: 'members' }]
            }
          ]);

        return res.status(200).json(responseHttp(200,true,"Todas las listas",allList));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}