import * as mongoose from "mongoose";
import * as dotenv from "dotenv"
import {userModel} from "../interface/userModel"

dotenv.config()

const url:string = String(process.env.URL)
mongoose.connect(url)

const userSchema = new mongoose.Schema<userModel>({
      firstname:{type:String , required:true , trim:true},
      lastname:{type:String , required:true , trim:true},
      tel:{type:String , required:true},
      email:{type:String , required:true , trim:true},
      username:{type:String , required:true},
      password:{type:String , required:true},
})

export default mongoose.model<userModel>("User",userSchema)