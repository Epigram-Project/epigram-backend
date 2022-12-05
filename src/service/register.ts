import { Request , Response} from "express";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv"

import {default as User} from "../model/user";
dotenv.config()

export default async function Register(req:Request , res:Response){
      const {firstname , lastname , tel , email , username ,password} = req.body
      
      if (!firstname && !lastname && !tel && !email && !username && !password){
            res.status(400).json({
                  "message":"haven't data any column"
            })
      }
      
      const checkEmail = await User.findOne({email:{$eq:email}})
      if (checkEmail){
            res.status(400).json({
                  "message":"repeat email"
            })
      }else{
            const saltRounds:number = parseInt(process.env.SALT as string)
            try{
                  const password_encode:string = await bcrypt.hash(password , saltRounds)
                  const result = await User.create({
                        firstname:firstname,
                        lastname:lastname,
                        tel:tel,
                        email:email,
                        username:username,
                        password:password_encode
                  })
                  
                  res.status(200).json({
                        "message":"success register"
                  })
            }catch(err){
                  console.log(err)
                  res.status(500).json({
                        "message":"error occur between server excuted"
                  })
            }
      }
}
