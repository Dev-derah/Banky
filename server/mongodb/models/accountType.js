import mongoose from "mongoose";


const accountType = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const AccountType = mongoose.model("AccountType", accountType);

export default AccountType;