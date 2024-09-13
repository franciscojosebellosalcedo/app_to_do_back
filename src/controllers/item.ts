import Item from "../models/item";
import { Request, Response } from "express";
import {responseHttp} from "../helpers/helpers";

export const saveItem=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const newItem=new Item({...data});
        const itemCreated=await newItem.save();
        if(!itemCreated){
         return res.status(400).json(responseHttp(400,false,"Error al crear el elemento"));
        }
        return res.status(200).json(responseHttp(200,true,"Elemento creado correctamente",itemCreated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllItems=async (req:Request,res:Response)=>{
    try{
        const allItems=await Item.find();
        return res.status(200).json(responseHttp(200,true,"Todos los elementos",allItems));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneItem=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const itemFound=await Item.findOne({_id:id});
        return res.status(200).json(responseHttp(200,true,"Elemento encontrado",itemFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteItem=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const itemDeleted=await Item.findOneAndDelete({_id:id});
        if(!itemDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar el elemento"));
        }
        return res.status(200).json(responseHttp(200,true,"Elemento eliminado"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateItem=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const newData=req.body;
        await Item.updateOne({_id:id},{...newData});
        const itemUpdated=await Item.findOne({_id:id});
        return res.status(200).json(responseHttp(200,true,"Elemento editado",itemUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}