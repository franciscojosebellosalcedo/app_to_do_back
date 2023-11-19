import WorkArea from "../models/workArea";
import { Request, Response } from "express";
import {responseHttp } from "../helpers/helpers";
import Board from "../models/board";
import List from "../models/list";
import Card from "../models/card";
import CheckList from "../models/checkList";

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
        const idUser=req.params.idUser;
        const workAreaFound=await WorkArea.findOne({_id:id,user:idUser}).populate(["user","members"]);
       if(workAreaFound){
            const boards:any= await Board.find({workArea:id});
            workAreaFound["boards"]=boards;
       }
        return res.status(200).json(responseHttp(200,true,"Area de trabajo encontrada",workAreaFound));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllWorksArea=async (req:Request,res:Response)=>{
    try{
        const idUser=req.params.idUser;
        const allWorksArea=await WorkArea.find({user:idUser}).populate(['members','user']).sort({createdAt:-1});
        const worksAreaList:any[]=[];
        for (const workArea of allWorksArea) {
            const idWorArea=workArea._id.toString();
            const boards:any= await Board.find({workArea:idWorArea});
            workArea["boards"]=boards;
            worksAreaList.push(workArea);
        }
        return res.status(200).json(responseHttp(200,true,"Todas las areas de trabajo",worksAreaList));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const deleteWorkArea = async (req:Request,res:Response)=>{
    try{
        const idWorkArea=req.params.id;
        const workAreaDeleted=await WorkArea.findByIdAndDelete({_id:idWorkArea});
        if(!workAreaDeleted){
            return res.status(400).json(responseHttp(400,false,"Error al eliminar esta area de trabajo"));
        }
        const allBoards=await Board.find({workArea:idWorkArea});
        allBoards.map(async (board)=>{
            const boardDeleted=await Board.findOneAndDelete({workArea:idWorkArea});
            const allList=await List.find({board:boardDeleted?._id.toString()});
            allList.map(async(list)=>{
                const listDeleted=await List.findByIdAndDelete({board:boardDeleted?._id.toString()});
                const allCards=await Card.find({list:listDeleted?._id.toString()});
                allCards.map(async (card)=>{
                    const cardDeleted=await Card.findOneAndDelete({list:listDeleted?._id.toString()})
                    const allCheckList=await CheckList.find({card:cardDeleted?._id.toString()});
                    allCheckList.map(async (checkList)=>{
                        await CheckList.findByIdAndDelete({card:cardDeleted?._id.toString()})
                    });
                });
            });
        });
        return res.status(200).json(responseHttp(200,true,"Area de trabajo eliminada"));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}