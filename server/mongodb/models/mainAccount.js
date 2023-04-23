import mongoose from "mongoose";

const MainAccountSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId},
  accountNumber: { type: Number, required: true },
  accountType: { type: String,default:"Savings"},
  accountBalance: { type: Number, default:0.00 },
  dateOpened: { type: Date, required: true },
  transactions:{type:Array,default:[]},
  transactions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  }],
});

const mainAccountModel = mongoose.model("MainAccount", MainAccountSchema);

export default mainAccountModel;