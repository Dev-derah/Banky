import { model } from "mongoose";
import User from "../mongodb/models/users.js";
import accountNumber from '../utils/createAccountNumber.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName , email } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await User.create({
          firstName,
          lastName,
          email,
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async(req,res) =>{
    try {
        const { id } = req.params;
        user = await User.findByIdAndUpdate()
    } catch (error) {
        
    }
}

const getUserById = async (req,res) => {
  try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req,res) =>{
    try {
      const { id } = req.params;
      const user = await User.deleteOne(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};

export { getAllUsers, createUser, updateUser, getUserById,deleteUser };
