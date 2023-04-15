import express from "express";

import { createAccountType,getAccountType } from "../controllers/accountType.controller.js";

const router = express.Router();

router.route("/").post(createAccountType);
router.route("/").get(getAccountType);

export default router;