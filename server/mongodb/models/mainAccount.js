import mongoose from "mongoose";
import Card from "./cards.js";
import User from "./users.js"

const MainAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId,ref:"User"},
  accountNumber: { type: Number, required: true },
  accountType: { type: String },
  accountPercentage: { type: Number, required: true},
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
    .padStart(16, "0");
  const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // One year from now
  const cvv = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // Find the user by their ObjectId
  const user = await User.findById(this.user);

  // Check if the user is found and has first and last names
  if (user && user.firstName && user.lastName) {
    const cardHolderName = `${user.firstName} ${user.lastName}`;

    const newCard = new Card({
      cardNumber,
      cardHolderName,
      expirationDate,
      cvv,
      accountType: this.accountType,
      user: this.user,
    });

    this.cards.push(newCard);
    await this.save();
    await newCard.save();
  } else {
    // Handle the case where the user is not found or doesn't have first and last names
    console.error("User not found or missing first/last name");
  }
};


const mainAccountModel = mongoose.model("MainAccount", MainAccountSchema);

export default mainAccountModel;
