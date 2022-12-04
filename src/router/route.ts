import { Router , Request , Response } from "express";
import * as jwt from "jsonwebtoken"

import { payloadProps } from "../interface/payload";
import { secretProps } from "../interface/secret";
import { checkToken } from "../middleware/middlewareAuth";
import { checkUser } from "../middleware/middlewareCheckUser";


import Register from "../service/register";


const router:Router = Router()

router.route("/register").post(Register)


router.route("/login").post(checkUser,(req:Request , res:Response) => {
    let {username , age , password}:{username:string,age:number,password:number | string} = req.body
    
    //* check type of password
    password = typeof password === "string" ? parseInt(password) : password
    
    const body:payloadProps = {
        "username":username,
        "age":age,
        "iat": new Date().getTime()
    }
    
    const secret:secretProps = String(process.env.SECRET)
    
    const token = jwt.sign(body , secret , {
        expiresIn:"2h"
    })

    res.status(200).json({
        "message":"success login",
        "token":token
    })
})

router.get("/user/read",checkToken,(req:Request,res:Response) => {
    res.status(200).json({
        "message":"success identify user",
    })
})


export default router