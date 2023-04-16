import express from "express";

import { initializeTransaction } from "../controllers/paystack.controller.js";

const router = express.Router();

router.route("/").get(initializeTransaction);

export default router;
