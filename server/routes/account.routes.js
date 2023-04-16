import express from 'express';
import {
  getAllAccounts,
  getAccountDetails,
  deleteAccountDetails,
  updateAccountDetails,
  createAccount,
} from "../controllers/mainAccount.controller.js";

import {
  getAllInvestmentAccounts,
  getInvestmentAccountDetails,
  deleteInvestmentAccountDetails,
  updateInvestmentAccountDetails,
  createInvestmentAccount
} from '../controllers/investmentAccount.controller.js'

const router = express.Router();
//Main Account
router.route("/").post(createAccount);
router.route("/").get(getAllAccounts);
router.route("/:id").get(getAccountDetails);
router.route("/:id").patch(updateAccountDetails);
router.route("/:id").delete(deleteAccountDetails);


//Vault Account


//Investment Account
router.route('/investment-account').post(createInvestmentAccount);
router.route("/investment-account").get(getAllInvestmentAccounts)
router.route("/investment-account/:id").get(getInvestmentAccountDetails);
router.route("/investment-account/:id").get(getInvestmentAccountDetails);
router.route("/:id").patch(updateInvestmentAccountDetails);
router.route("/:id").delete(deleteInvestmentAccountDetails);

export default router;