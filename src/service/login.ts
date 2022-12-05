import { Request , Response} from "express"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import * as dotenv from "dotenv"

import user from "../model/user";
import { payloadInterface } from "../interface/payload"

dotenv.config()

function changeTypePassword(password:number):string
function changeTypePassword(password:string):string
function changeTypePassword(password:string | number):string {
      if (typeof password === "number"){
            return (password).toString()
      }else{
            return password
      }
}

export default async function Login(req:Request , res:Response){
      const {username , password} = req.body

      try{
            const result = await user.findOne({username:{$eq:username}})
            if (!result){
                  res.status(400).json({
                        "message":"don't exist username in the database"
                  })
            }else{
                  const password_decode:boolean = await bcrypt.compare(changeTypePassword(password),result!.password)
                  if (password_decode){
                        const payload:payloadInterface = {
                              firstname:result!.firstname,
                              lastname:result!.lastname,
                              username:result!.username,
                              iat: new Date().getTime()
                        }

                        const secret:string = String(process.env.SECRET)
                        const token:string = jwt.sign(payload,secret,{
                              expiresIn:"1h"
                        })

                        res.status(200).json({
                              "message":"success login",
                              "token":token
                        })
                  }else{
                        res.status(400).json({
                              "message":"wrong password",
                        })
                  }
            }
      }catch(err){
            console.log(err)
            res.status(500).json({
                  "message":"error occur between server excuted"
            })
      }
      
}




// (req:Request , res:Response) => {
//       let {username , age , password}:{username:string,age:number,password:number | string} = req.body
      
//       //* check type of password
//       password = typeof password === "string" ? parseInt(password) : password
      
//       const body:payloadProps = {
//           "username":username,
//           "age":age,
//           "iat": new Date().getTime()
//       }
      
//       const secret:secretProps = String(process.env.SECRET)
      
//       const token = jwt.sign(body , secret , {
//           expiresIn:"2h"
//       })
  
//       res.status(200).json({
//           "message":"success login",
//           "token":token
//       })
//   }
