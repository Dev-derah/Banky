import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mainAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainAccount",
  },
  investmentAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestmentAccount",
  },
});

const userModal = mongoose.model("User", UserSchema);

export default userModal;
