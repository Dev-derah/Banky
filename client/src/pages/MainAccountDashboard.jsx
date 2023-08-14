import SummaryCard from "../components/SummaryCard";
import {
  calculatorIcon,
  clockIcon,
  depositIcon,
  transferIcon,
  walletIcon,
} from "../assets/index";
import {
  DashboardLayout,
  DebitCard,
  Modal,
  TransactionsTable,
} from "../components";
import { useEffect, useState } from "react";
import {
  faChevronRight,
  faBuildingColumns,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency, transactionsData } from "../../utils/data";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";

const MainAccountDashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const number = 500000000000;
  const [showModal, setShowModal] = useState(false);
  const [accountData, setAccountData] = useState(null);


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch account data when the component mounts
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await api.get(`/accounts/main-account/${userId}`);

      // Set the fetched account data to the state
      setAccountData(response.data.mainAccount);
    } catch (error) {
      console.error("Error fetching account data:", error);
      navigate("/login");
    }
  };

  return (
    <DashboardLayout>
      {accountData ? (
        <>
          <Modal isOpen={showModal} onClose={handleCloseModal}>
            <div className="mt-3 flex w-full">
              <div className="mt-2 text-center sm:text-left w-full">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Transfer
                </h4>
                <div className="p-4 shadow-md mb-6 bg-gray-200 dark:bg-gray-800 flex justify-between items-center cursor-pointer">
                  <span>
                    <FontAwesomeIcon icon={faRightLeft} className="mr-4" />
                    Transfer to Banky Account
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div className="p-4 shadow-md mb-6 bg-gray-200 dark:bg-gray-800 flex justify-between items-center cursor-pointer">
                  <span>
                    <FontAwesomeIcon
                      icon={faBuildingColumns}
                      className="mr-4"
                    />
                    Transfer to Other Banks
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <div className=" text-white justify-center items-center mt-6 shadow-md h-[20vh] bg-primary-500 balance-card rounded-md flex p-4">
            <div className="h-full w-[70%] flex flex-col justify-center ">
              <p className="text-xs md:text-base">Main Account Balance</p>
              <p className="w-full text-xl font-extrabold font-sans md:text3xl">
                {formatCurrency(accountData.accountBalance)}
              </p>
            </div>

            <div className="flex flex-col gap-x-10 md:flex md:flex-row gap-y-4">
              <button className="flex items-center gap-x-1 bg-white text-[#22285E] px-4 py-2 rounded-lg md:px-8  dark:bg-gray-300">
                <span className="w-4">
                  <img
                    src={depositIcon}
                    className="w-full h-full"
                    alt="DepositIcon"
                  />
                </span>
                <p className="hidden md:block">Deposit</p>
              </button>
              <button
                className="bg-white flex items-center gap-x-1 text-[#22285E] px-4 py-2 rounded-lg md:px-8  dark:bg-gray-300"
                onClick={handleOpenModal}
              >
                <span className="w-4">
                  <img src={transferIcon} className="w-full h-full" />
                </span>
                <p className="hidden md:block">Transfer</p>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
            <div className=" md:col-span-2 md:row-span-4">
              <div className="md:flex md:gap-x-3">
                <SummaryCard icon={walletIcon} title="Payments" amount={0} />
                <SummaryCard
                  icon={calculatorIcon}
                  title="Payments"
                  amount={0}
                />
                <SummaryCard icon={clockIcon} title="Payments" amount={0} />
              </div>

              <TransactionsTable transactionsData={accountData.transactions} />
            </div>
            <div className="cols-1">
              {accountData.cards.map((card, index) => (
                <DebitCard
                  key={index}
                  cardHolderName={card.cardHolderName}
                  accountNumber={card.cardNumber}
                  expiry={card.expirationDate}
                  cvv={card.cvv}
                />
              ))}
              <div className="w-full mt-5">
                <div>
                  <ul className="p-4 bg-white drop-shadow-md dark:bg-gray-800">
                    <h3 className="text-2xl header font-bold dark:text-gray-200">
                      Top Transactions
                    </h3>
                    <li className="flex justify-between py-5 border-b-2">
                      Waverley Gomby{" "}
                      <span className="text-credit">{formatCurrency(200)}</span>
                    </li>
                    <li className="flex justify-between py-5 border-b-2">
                      Waverley Gomby <span className="text-debit">1000</span>
                    </li>
                    <li className="flex justify-between py-5 border-b-2">
                      Waverley Gomby <span className="text-debit">1000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingSpinner size="large" />
        </div>
      )}
    </DashboardLayout>
  );
};

export default MainAccountDashboard;
