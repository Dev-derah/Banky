import express from 'express';
import {
  getAllAccounts,
  getAccountDetails,
  deleteAccountDetails,
  updateAccountDetails,
} from "../controllers/account.controller.js";

const router = express.Router();

router.route("/").get(getAllAccounts);
router.route("/").get(getAccountDetails);
router.route("/:id").patch(updateAccountDetails);
router.route("/:id").delete(deleteAccountDetails);

export default router;