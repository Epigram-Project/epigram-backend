import { Request , Response , NextFunction, RequestHandler } from "express"
import * as jwt from "jsonwebtoken"

import { secretProps } from "../interface/secret"

export const checkToken:RequestHandler = (req:Request , res:Response , next:NextFunction) => {
      const secret:secretProps = String(process.env.SECRET)

      if (!req.headers.token){
            res.status(400).json({
                  "message":"don't attach token"
            })
      }else{
            const decode:string | jwt.JwtPayload = jwt.verify(String(req.headers.token) , secret)
            console.log(decode)
            next()
      }
}