import { Router , Request , Response } from "express";

import { checkToken } from "../middleware/middlewareAuth";
import { checkUser } from "../middleware/middlewareCheckUser";

import Register from "../service/register";
import Login from "../service/login";

const router:Router = Router()

router.route("/register").post(Register)
router.route("/login").post(Login)

router.get("/user/read",checkToken,(req:Request,res:Response) => {
    res.status(200).json({
        "message":"success identify user",
    })
})


export default router