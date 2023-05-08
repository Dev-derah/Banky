import { model } from "mongoose";
import User from "../mongodb/models/users.js";
import MainAccount from "../mongodb/models/mainAccount.js";
import InvestmentAccount from "../mongodb/models/investmentAccount.js";
import createAccountNumber from "../utils/createAccountNumber.js";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse.js";

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

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!firstName || !lastName || !email || !phoneNumber || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (userExists)
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });

    const newUser = await User({
      firstName,
      lastName,
      phoneNumber,
      password,
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
      transactions: null,
    });
    await newInvestmentAccount.save();
    newUser.investmentAccount = newInvestmentAccount._id;

    // Save user to MongoDB
    await newUser.save();
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// LOGIN Authenticated user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email and Password are required" });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await user.comparePassword(password, user.password);

    // if password is incorrect, return error
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // if user and password are valid, return success
    sendTokenResponse(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const sendTokenResponse = async (user, statusCode, res) => {
  const token = await user.getJwtToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 3600,
      path: "/",
      httpOnly: true,
      sameSite: "None",
    })
    .json({ success: true, token });
};

const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id, "-password")
      .populate("mainAccount")
      .populate("investmentAccount");
    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//logout user
const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {});
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
  userProfile,
};
