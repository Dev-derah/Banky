import mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  transactionType: { type: String, required: true },
  transactionAmount: { type: Number, required: true },
  mainAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainAccount",
  },
});

const transactionModel = mongoose.model("Transaction", TransactionsSchema);

export default transactionModel;
