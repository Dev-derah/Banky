import { model } from "mongoose";
import User from "../mongodb/models/users.js";
import bcrypt from "bcrypt";
import MainAccount from "../mongodb/models/mainAccount.js";
import InvestmentAccount from "../mongodb/models/investmentAccount.js";
import createAccountNumber from "../utils/createAccountNumber.js";
import jwt from "jsonwebtoken";

const userToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email });
    if (!firstName || !lastName || !email || !phoneNumber || !password)
      return res.status(400).json({ message: "All fields are required." });

    if (userExists) return res.status(409).json({ message: "userExists" });

    const newUser = await User({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
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
    const token = userToken(newUser._id);

    const newInvestmentAccount = new InvestmentAccount({
      user: newUser._id,
      accountType: "Investments",
      accountBalance: 0.0,
      dateOpened: Date.now(),
      transactions: null,
    });
    await newInvestmentAccount.save();
    newUser.investmentAccount = newInvestmentAccount._id;

    // Save user to MongoDB
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN Authenticated user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const token = userToken(user._id);
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email and Password are required" });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    // if password is incorrect, return error
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // if user and password are valid, return success
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
    
  }
};

//logout user
const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    user = await User.findByIdAndUpdate({ _id: id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id })
      .populate("mainAccount")
      .populate("investmentAccount");

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
    const user = await User.deleteOne({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
  loginUser,
  logout,
};
