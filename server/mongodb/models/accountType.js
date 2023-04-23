import mongoose from "mongoose";


const accountType = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ["Savings", "Investment","Vault"],
    default: "user",
  },
});

const AccountType = mongoose.model("AccountType", accountType);

export default AccountType;