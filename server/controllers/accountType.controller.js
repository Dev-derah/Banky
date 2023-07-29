import { model } from "mongoose";
import AccountType from "../mongodb/models/accountType.js";

const createAccountType = async (req, res) => {
  try {
    const { name, spend, invest, save, description,isRecommended } = req.body;

    if (!name || !spend || !invest || !save || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new account type
    const newAccountType = await new AccountType({
      Name: name,
      Spend: spend,
      Invest: invest,
      Save: save,
      Description: description,
      isRecommended: isRecommended || false,
    });

    // Save the new account type to the database
    const savedAccountType = await newAccountType.save();
    
    res.status(201).json({ success: true, accountType: savedAccountType });
  } catch (error) {
    res.status(500).json({ message: "Failed to create account type" });
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
