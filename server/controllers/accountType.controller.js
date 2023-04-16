import { model } from "mongoose";
import AccountType from "../mongodb/models/accountType.js";

const createAccountType = async (req, res) => {
  const { name, description } = req.body;
  try {
    const accountType = new AccountType({ name, description });
    await accountType.save();
    res.status(201).json(accountType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAccountType = async (req, res) => {
        try {
          const accountTypes = await AccountType.find({});
          res.status(200).json(accountTypes);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
};

export { createAccountType, getAccountType };
