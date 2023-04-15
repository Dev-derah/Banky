import Account from "../mongodb/models/mainAccount.js";

function createAccountNumber(startingFigure) {
  // Convert the starting figure to a string and add it to the beginning of the account number
  let accountNumber = startingFigure.toString();

  // Generate random digits to fill in the rest of the account number
  for (let i = 1; i < 10; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }
  return accountNumber;
}

export default createAccountNumber;
