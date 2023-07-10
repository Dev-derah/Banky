import {
  faMoneyBillTransfer,
  faHouse,
  faPiggyBank,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
export const sideBarItems = [
  { path: "/dashboard", label: "Dashboard", icon: faHouse },
  {
    path: "/transactions",
    label: "Transactions",
    icon: faMoneyBillTransfer,
  },
  {
    path: "/savings",
    label: "Savings",
    icon: faPiggyBank,
  },
  {
    path: "/investments",
    label: "Investments",
    icon: faChartColumn,
  },
];


export const transactionsData = [
  {
    id: "1",
    name: "Trf/Jane Doe/transaction Description",
    type: "Debit",
    amount: 100,
    date: new Date(),
  },
  {
    id: "2",
    name: "Trf/Jane Doe/transaction Description",
    type: "Credit",
    amount: 600,
    date: new Date(),
  },
  {
    id: "3",
    name: "Trf/Jane Doe/transaction Description",
    type: "Credit",
    amount: 60000000,
    date: new Date(),
  },
];


export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatter.format(amount);
};