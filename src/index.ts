import express from "express"
import { Request , Response , Application } from "express"
import * as dotenv from "dotenv"
import morgan from "morgan"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import route from "./router/route"

const app:Application = express()
dotenv.config()

app.use(express.json())
app.use(morgan("dev"))
app.use(compression())
app.use(helmet())
app.use(cors())

app.get("/",(req:Request,res:Response) => {
    res.status(200).send("typescript backend")
})

app.use(route)


app.listen(process.env.PORT,() => {
    console.log("connecting to port 8000")
})