import { model } from "mongoose";
import MainAccount from "../mongodb/models/mainAccount.js";
import User from "../mongodb/models/users.js";
import createAccountNumber from "../utils/createAccountNumber.js";

const createAccount = async (req, res) => {
  try {
    const { accountType, user } = req.body;
    let accountNumber = createAccountNumber(22);
    const accountNumberExists = await MainAccount.findOne({ accountNumber });
    const userExists = await User.findOne({ id: user });
    
    if (accountNumberExists) {
      accountNumber = createAccountNumber(22);
    }

    const newAccount = await MainAccount.create({
      user,
      accountNumber,
      accountType,
      accountBalance: 0,
      dateOpened: Date.now(),
    });
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.meassage });
  }
};
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await MainAccount.find({});
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAccountDetails = async (req, res) => {};
const updateAccountDetails = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.query;
  const Useraccount = await MainAccount.findOneAndUpdate(
    { user: id },
    { $inc: { accountBalance: amount/100 } },
    { new: true }
  );
  try {
    res.status(200).json(Useraccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAccountDetails = async (req, res) => {};

export {
  getAllAccounts,
  getAccountDetails,
  updateAccountDetails,
  deleteAccountDetails,
  createAccount,
};
