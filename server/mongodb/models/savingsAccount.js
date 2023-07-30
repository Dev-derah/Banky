import mongoose from "mongoose";

const SavingsAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  accountType: { type: String },
  accountBalance: { type: Number, default: 0.0 },
  dateOpened: { type: Date, required: true },
  savings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

const savingsAccountModel = mongoose.model(
  "SavingsAccount",
  SavingsAccountSchema
);

export default savingsAccountModel;
