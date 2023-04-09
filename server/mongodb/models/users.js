import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{ type:String,required:true },
    email:{ type:String,required:true },
    avatar:{type:String, required:true},
    AllAccounts:{type:mongoose.Schema.Types.ObjectId,ref:'Account'}
})

const userModal =mongoose.model('User',UserSchema)

export default userModal