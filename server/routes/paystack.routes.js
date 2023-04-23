import express from "express";

import { verifyTransaction } from "../controllers/paystack.controller.js";

const router = express.Router();

router.route("/:ref").get(verifyTransaction);

export default router;
