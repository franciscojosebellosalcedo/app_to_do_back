import Card from "../models/card";
import { Request, Response } from "express";
import {responseHttp} from "../helpers/helpers";

export const saveCard=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const newCard=new Card({...data});
        const cardCreated=await (await newCard.save()).populate(["members","labels"]);
        if(!cardCreated){
            return res.status(400).json(responseHttp(400,false,"Error al crear la tarjeta"));
        }
        return res.status(200).json(responseHttp(200,true,"Tarjeta creada correctamente",cardCreated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateCard=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const newData=req.body;
        await Card.updateOne({_id:id},{...newData});
        const cardUpdated=await (await Card.findOne({_id:id}))?.populate(["members","labels"]);
        return res.status(200).json(responseHttp(200,true,"Tarjeta editada correctamente",cardUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteCard=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const cardDeleted=await Card.findByIdAndDelete({_id:id});
        if(!cardDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar la tarjeta"));
        }
        return res.status(200).json(responseHttp(200,true,"Tarjeta eliminada"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneCard=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const cardFound=await Card.findOne({_id:id}).populate(["members","labels"]);
        return res.status(200).json(responseHttp(200,true,"Tarjeta encontrada",cardFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllCards=async (req:Request,res:Response)=>{
    try{
        const allCards=await Card.find().populate(["members","labels"]);
        return res.status(200).json(responseHttp(200,true,"Todas las tarjeta",allCards));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}