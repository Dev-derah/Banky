import mongoose from "mongoose";
const beneficiariesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
});
const beneficiaryModel = mongoose.model("beneficiary", beneficiariesSchema);

export default beneficiaryModel;