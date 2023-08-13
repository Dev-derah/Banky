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
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();
//Main Account
router.route("/main-account").post(createAccount);
router.route("/main-account").get(getAllAccounts);
router.route("/main-account/:id").get(isAuthenticated,getAccountDetails);
router.route("/main-account/:id").patch(updateAccountDetails);
router.route("/main-account/:id").delete(deleteAccountDetails);


//Vault Account


//Investment Account
router.route('/investment-account').post(createInvestmentAccount);
router.route("/investment-account").get(getAllInvestmentAccounts)
router.route("/investment-account/:id").get(getInvestmentAccountDetails);
router.route("/investment-account/:id").get(getInvestmentAccountDetails);
router.route("/investment-account/:id").patch(updateInvestmentAccountDetails);
router.route("/investment-account/:id").delete(deleteInvestmentAccountDetails);

export default router;