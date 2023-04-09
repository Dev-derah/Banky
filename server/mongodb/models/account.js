import mongoose from "mongoose";

const AccountSchema= new mongoose.Schema({
    accountNumber:{ type:Number,required:true },
    accountType:{ type:String,required:true },
    accountBalance:{ type:Number,required: true },
    accountOwner:{ type:mongoose.Schema.Types.ObjectId,ref:'User' },
})

const accountModel = mongoose.model('Account',AccountSchema);

export default accountModel;