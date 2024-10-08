import Board from "../models/board";
import { Request, Response } from "express";
import {responseHttp } from "../helpers/helpers";
import WorkArea from "../models/workArea";

export const getAllBoardOnlyFavorite=async (req:Request, res:Response)=>{
    try {
        const idUser=req.params.idUser;
        const allWorkAreas=await WorkArea.find({user:idUser});
        const allBoardsFavorite=[];
        allWorkAreas.map(async(workArea:any)=>{
            const boardsFavorite=await Board.find({workArea:workArea?._id.toString(),isFavorite:true});
            allBoardsFavorite.push(boardsFavorite);
        });
        return res.status(200).json(responseHttp(200,true,"Todos los tableros favoritos"));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const saveBoard=async (req:Request, res:Response)=>{
    try {
        const data=req.body;
        const newBoard=new Board({...data});
        const boardCreated=await (await newBoard.save()).populate([
            {
                path:"workArea",
                populate:[{path:"user"}]
            }
        ]);
        if(!boardCreated){
            return res.status(400).json(responseHttp(400,false,"Error al crear el tablero"));
        }
        return res.status(200).json(responseHttp(200,true,"Tablero creado correctamente",boardCreated));
    } catch (error) {
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllBoards=async (req:Request, res:Response )=>{
    try{
        const allBoards=await Board.find().populate([
            {
                path:"workArea",
                populate:[{path:"user"}]
            }
        ]);
        return res.status(200).json(responseHttp(200,true,"Todos los tableros",allBoards));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getOneBoard=async (req:Request, res:Response)=>{
    try{
        const id =req.params.id;
        const boardFound=await Board.findOne({_id:id}).populate([
            {
                path:"workArea",
                populate:[{path:"user"}]
            }
        ]);
        return res.status(200).json(responseHttp(200,true,"Tablero encontrado",boardFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateBoard= async (req:Request, res:Response)=>{
    try{
        const id=req.params.idBoard;
        const idWorkArea=req.params.idWorkArea;
        const newData=req.body;
        await Board.updateOne({_id:id,workArea:idWorkArea},{...newData});
        const boardUpdated=await Board.findOne({_id:id}).populate([
            {
                path:"workArea",
                populate:[{path:"user"}]
            }
        ]);
        return res.status(200).json(responseHttp(200,true,"Tablero editado",boardUpdated));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteBoard=async (req:Request, res:Response)=>{
    try{
        const id=req.params.id;
        const boardDelted=await Board.findByIdAndDelete({_id:id});
        if(!boardDelted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar el tablero"));
        }
        return res.status(200).json(responseHttp(200,true,"Tablero eliminado"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}