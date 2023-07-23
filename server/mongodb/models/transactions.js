import mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    transactionType: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true,
    },
    transactionAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("Transaction", TransactionsSchema);

export default transactionModel;
