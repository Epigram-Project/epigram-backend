import { Request , Response , NextFunction, RequestHandler } from "express"
import User from "../model/user";

export const checkUser:RequestHandler = async (req:Request , res:Response , next:NextFunction) => {
      let {username , age , password}:{username:string,age:number,password:number | string} = req.body
    
    try{
      const result = await User.findOne({username:{$eq:username}})
      if (result){
            if (password === result.password){
                  next()
            }else{
                  res.status(400).json({
                        "message":"wrong password"
                  })
            }
      }else{
            res.status(404).json({
                  "message":"don't exist user"
            })
      }
    }catch(err){
      console.log(err)
      res.status(500).json({
            "message":"error occurs in server"
      })
    }
}