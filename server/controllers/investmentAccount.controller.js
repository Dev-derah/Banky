import { model } from "mongoose";
import InvestmentAccount from "../mongodb/models/investmentAccount.js";
import User from "../mongodb/models/users.js";

const createInvestmentAccount = async (req, res) => {
  try {
    const { accountType, user } = req.body;
    const userExists = await User.findOne({ id: user });

    const newAccount = await InvestmentAccount({
      user,
      accountType,
      accountBalance: 0.0,
      dateOpened: Date.now(),
    });

        if (userExists) {
          userExists.userAccounts.push(newAccount);
        } else {
            await newAccount.save();
        }
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.meassage });
  }
};
const getAllInvestmentAccounts = async (req, res) => {
  try {
    const accounts = await InvestmentAccount.find({});
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getInvestmentAccountDetails = async (req, res) => {};
const updateInvestmentAccountDetails = async (req, res) => {};
const deleteInvestmentAccountDetails = async (req, res) => {};

export {
  getAllInvestmentAccounts,
  getInvestmentAccountDetails,
  updateInvestmentAccountDetails,
  deleteInvestmentAccountDetails,
  createInvestmentAccount,
};
