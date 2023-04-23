import { formatDate, formatTime } from "../utils/dateTime_formatter.js";
import User from "../mongodb/models/users.js";
import Transaction from "../mongodb/models/transactions.js";
import MainAccount from "../mongodb/models/mainAccount.js";
import InvestmentAccount from "../mongodb/models/investmentAccount.js";

const verifyTransaction = async (req, res) => {
  const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
  const { ref } = req.params;

  paystack.transaction.verify(ref, async function (error, body) {
    if (error) {
      return console.log(error);
    } else {
      const amount = body.data.amount/100;
      const date = formatDate(body.data.paid_at);
      const time = formatTime(body.data.paid_at);
      const email = body.data.customer.email;
      const user = await User.findOne({ email });

      const newTransaction = new Transaction({
        date,
        time,
        transactionType: "Account Funding",
        transactionAmount: amount,
        mainAccount: user.mainAccount,
      });
      await newTransaction.save();

      const mainAccount = await MainAccount.findOneAndUpdate(
        { user: user._id },
        {
          $inc: { accountBalance: amount * 0.5 },
          $push: { transactions: newTransaction },
        },
        { new: true }
      ).populate("transactions");
      const investmentAccount = await InvestmentAccount.findOneAndUpdate(
        { user: user._id },
        {
          $inc: { accountBalance: amount * 0.2 },
        },
        { new: true }
      );
      console.log(investmentAccount,amount);                 
      res.send(mainAccount);
    }
  });
};

export { verifyTransaction };
