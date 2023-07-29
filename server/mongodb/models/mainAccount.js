import mongoose from "mongoose";
import Card from "./cards.js";
import { nanoid } from "nanoid";

const MainAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  accountNumber: { type: Number, required: true },
  accountType: { type: String, default: "Savings" },
  accountBalance: { type: Number, default: 0.0 },
  cards: [Card.schema],
  dateOpened: { type: Date, required: true },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});
MainAccountSchema.methods.generateCardDetails = async function () {
  const cardNumber = Math.floor(Math.random() * 10000000000000000)
    .toString()
    .padStart(16, "0");;
  const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // One year from now
  const cvv = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const cardHolderName = "Jane Doe";

  const newCard = new Card({
    cardNumber,
    cardHolderName,
    expirationDate,
    cvv,
    accountType: this.accountType,
    user: this.user,
  });

 this.cards.push(newCard);
 await Promise.all([this.save(), newCard.save()]);
};

const mainAccountModel = mongoose.model("MainAccount", MainAccountSchema);

export default mainAccountModel;
