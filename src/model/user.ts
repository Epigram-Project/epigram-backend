import * as mongoose from "mongoose";
import * as dotenv from "dotenv"
import {userProps} from "../interface/userProps"

dotenv.config()

const url:string = String(process.env.URL)
mongoose.connect(url)

const userSchema = new mongoose.Schema<userProps>({
      firstname:{type:String , required:true , trim:true},
      lastname:{type:String , required:true , trim:true},
      tel:{type:String , required:true},
      email:{type:String , required:true , trim:true},
      username:{type:String , required:true},
      password:{type:String , required:true},
})

export default mongoose.model<userProps>("User",userSchema)