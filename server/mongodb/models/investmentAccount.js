import mongoose from "mongoose";

const InvestmentAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  accountType: { type: String, default: "Investments" },
  accountBalance: { type: Number, default: 0.0 },
  dateOpened: { type: Date, required: true },
});

const investmentAccountModel = mongoose.model("InvestmentAccount", InvestmentAccountSchema);

export default investmentAccountModel;
