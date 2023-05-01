import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true, },
  mainAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainAccount",
  },
  investmentAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestmentAccount",
  },
});


UserSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  this.password = await bcrypt.hash(this.password,10)
})

UserSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
}; 

const userModal = mongoose.model("User", UserSchema);

export default userModal;
