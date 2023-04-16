import { model } from "mongoose";
import User from "../mongodb/models/users.js";
import MainAccount from "../mongodb/models/mainAccount.js";
import InvestmentAccount from "../mongodb/models/investmentAccount.js";
import createAccountNumber from "../utils/createAccountNumber.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("mainAccount")
      .populate("investmentAccount");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const newUser = await User({
      firstName,
      lastName,
      email,
    });

    const newMainAccount = new MainAccount({
      user: newUser._id,
      accountNumber: createAccountNumber(22),
      accountType: "Savings",
      accountBalance: 0.0,
      dateOpened: Date.now(),
    });

    await newMainAccount.save();
    newUser.mainAccount = newMainAccount._id;

        const newInvestmentAccount = new InvestmentAccount({
          user: newUser._id,
          accountType: "Investments",
          accountBalance: 0.0,
          dateOpened: Date.now(),
        });
        await newInvestmentAccount.save();
        newUser.investmentAccount = newInvestmentAccount._id;

    // Save user to MongoDB
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    user = await User.findByIdAndUpdate();
  } catch (error) {}
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id })
      .populate("mainAccount")
      .populate("investmentAccount");;

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.deleteOne(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, updateUser, getUserById, deleteUser };
