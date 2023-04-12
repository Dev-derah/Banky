import mongoose from "mongoose";

const TransactionsSchema =new mongoose.Schema({
    date:{type,Date,required:true},
    transactionType:{type:String,required:true},
    transactionAmount:{type:Number,required:true}

})