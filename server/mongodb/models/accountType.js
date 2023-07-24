import mongoose from "mongoose";

const accountTypeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Spend: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  Invest: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  Save: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  Description: { type: String, required: true },
  isRecommended: {
    type: Boolean,
    default: false,
  },
});
const AccountType = mongoose.model("AccountType", accountTypeSchema);

export default AccountType;