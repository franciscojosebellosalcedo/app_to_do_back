import { Request, Response } from "express";
import { isEmailValid, responseHttp } from "../helpers/helpers";
import User from "../models/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


export const userLogin=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const userFound=await User.findOne({email:data.email});
        if(!userFound){
            return res.status(400).json(responseHttp(400,false,"Usuario no registrado"));
        }
        const isPasswordValid=await bcrypt.compare(data.password,(userFound?.password as string));
        if(!isPasswordValid){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        const dataUser={email:userFound.email,_id:userFound._id};
        const accessToken=jwt.sign(dataUser,process.env.SECRET_ACCESS_TOKEN as string,{algorithm:"HS256"});
        const refressToken=jwt.sign(dataUser,process.env.SECRET_REFRESS_TOKEN as string,{algorithm:"HS256"});
        return res.status(200).json(responseHttp(200,true,"Credenciales validas",{user:dataUser,refressToken,accessToken}));
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const saveUser=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        if(data.password.length <8){
            return res.status(400).json(responseHttp(400,false,"La contraseña debe de tener minimo 8 caracteres"));
        }
        const userFound=await User.findOne({email:data.email});
        if(userFound){
            return res.status(400).json(responseHttp(400,false,"Usuario ya existente en el sistema"));
        }
        if(isEmailValid(data.email)){
            data.password=await bcrypt.hash(data.password,8);
            const newUser=new User({...data});
            await newUser.save();
            if(!newUser){
                return res.status(400).json(responseHttp(400,false,"No se pudo crear el usuario"));
            }
            return res.status(400).json(responseHttp(200,true,"Usuario creado correctamente",newUser));
        }
        return res.status(400).json(responseHttp(400,false,"Correo electronico no valido"));
    } catch (error) {
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
        
    }
}

export const deleteUser=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const responseDeleted=await User.findByIdAndDelete({_id:id});
        if(!responseDeleted){
            return res.status(400).json(responseHttp(400,false,"No se pudo eliminar este usuario"));
        }
        return res.status(200).json(responseHttp(200,true,"Usuario eliminado correctamente"));
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const getAllUsers=async (req:Request,res:Response)=>{
    try{
       const allUsers=await User.find(); 
       return res.status(200).json(responseHttp(200,true,"Todos los usuarios",allUsers));
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const updateUser= async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const dataNew=req.body;
        if(dataNew.password){
            dataNew.password=await bcrypt.hash(dataNew.password,8);
        }
        const responseUpdated=await User.updateOne({_id:id},{...dataNew});
        if(responseUpdated.modifiedCount>0){
            return res.status(200).json(responseHttp(200,true,"Usuario actualizado"));
        }
       return res.status(400).json(responseHttp(400,false,"Error al actualizar el usuario"));
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}