import { Request, Response } from "express";
import { isEmailValid, responseHttp } from "../helpers/helpers";
import User from "../models/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const getNewAccessToken=async (req:Request,res:Response)=>{
    try{
        const headers=req.headers;
        const parts=(headers["access-token"] as string).split(" ");
        if(parts[1]!=="bearer"){
            const refressToken=parts[1];
            jwt.verify(refressToken,(process.env.SECRET_REFRESS_TOKEN as string),async (error,data)=>{
                if(error){
                    return res.status(400).json(responseHttp(400,false,"Token no válido"));
                }
                const idUser=Object(data)._id;
                const userFound=await User.findOne({_id:idUser});
                if(userFound){
                    const dataToken={email:userFound?.email,_id:userFound?._id,biography:userFound?.biography};
                    const newAccessToken=jwt.sign(dataToken,(process.env.SECRET_ACCESS_TOKEN as string));
                    const newRefressToken=jwt.sign(dataToken,(process.env.SECRET_REFRESS_TOKEN as string));
                    userFound.token=newAccessToken;
                    await userFound.save();
                    return res.status(200).json(responseHttp(200,true,"",{user:dataToken,accessToken:newAccessToken,refressToken:newRefressToken}));
                }
            });
        }else{
            return res.status(400).json(responseHttp(400,false,"Token no válido"));
        }
    }catch(error){
        return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}

export const userLogin=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const userFound=await User.findOne({email:data.email});
        if(!userFound){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        const isPasswordValid=await bcrypt.compare(data.password,(userFound?.password as string));
        if(!isPasswordValid){
            return res.status(400).json(responseHttp(400,false,"Correo o contraseña no valida"));
        }
        const dataUser={email:userFound?.email,_id:userFound._id,biography:userFound?.biography};
        const accessToken=jwt.sign(dataUser,process.env.SECRET_ACCESS_TOKEN as string,{algorithm:"HS256"});
        userFound.token=accessToken;
        userFound.save();
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
            return res.status(200).json(responseHttp(200,true,"Usuario creado correctamente",{email:newUser.email,_id:newUser._id}));
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
        const userFound=await User.findOne({_id:id});
        if(userFound && userFound?.password){
            if(dataNew.password){
                const compareCurrentpassword=await bcrypt.compare(dataNew.currentPassword,userFound?.password);
                if(!compareCurrentpassword){
                    return res.status(400).json(responseHttp(400,false,"Contraseña actual incorrecta"));
                }
                dataNew.password=await bcrypt.hash(dataNew.password,8);
            }
            delete dataNew.currentPassword;
            const responseUpdated=await User.findOneAndUpdate({_id:id},{...dataNew});
            if(responseUpdated){
                const userUpdate=await User.findOne({_id:id});
                return res.status(200).json(responseHttp(200,true,"Datos actualizados",{_id:userUpdate?._id,email:userUpdate?.email,biography:userUpdate?.biography}));
            }
            return res.status(400).json(responseHttp(400,false,"Error al actualizar el usuario"));
        }
    }catch(error){
       return res.status(400).json(responseHttp(400,false,"Se produjo un error en el servidor"));
    }
}