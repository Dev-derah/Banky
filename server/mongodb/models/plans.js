import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  spend: { type: Number, required: true },
  invest: { type: Number, required: true },
  save: { type: Number, required: true },
  description: { type: String, required: true },
});

const planModel = mongoose.model("Plan", PlanSchema);

module.exports = planModel;
