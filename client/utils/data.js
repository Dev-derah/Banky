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
