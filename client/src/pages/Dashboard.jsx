// import { useEffect, useState } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import SideBar from "../components/SideBar";
// import SummaryCard from "../components/SummaryCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useFitText from "use-fit-text";
// import {
//   calculatorIcon,
//   clockIcon,
//   depositIcon,
//   transferIcon,
//   walletIcon,
// } from "../assets/index";
// import { DebitCard, LoadingScreen, TransactionsTable,Modal,HamburgerMenu } from "../components";
// import {
//   faChevronRight,
//   faBuildingColumns,
//   faRightLeft,
// } from "@fortawesome/free-solid-svg-icons";

// const Dashboard = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [bank, setBank] = useState();
//   //   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const { token } = useSelector((state) => state.auth);

//   const sendRequest = async () => {
//     const headers = {
//       Authorization: "Bearer " + token,
//     };
//     await axios
//       .get("", { headers })
//       .then((res) => {
//         const data = res.data;
//         setUserInfo(data.user);
//         console.log(data.user);
//       })
//       .catch((error) => {
//         // Handle error response
//         if (error.response) {
//           console.log(error.response.data.message);
//         } else {
//           console.log("An error occurred:", error.message);
//         }
//       });
//   };
//   useEffect(() => {
//     sendRequest();
//     getBanks();
//   }, []);

//   const getBanks = async () => {
//     await axios
//       .get("https://api.paystack.co/bank")
//       .then((res) => {
//         setBank(res.data.data);
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response.data.message);
//         } else {
//           console.log("An error occurred:", error.message);
//         }
//       });
//   };
//   return userInfo ? (
//     <LoadingScreen />
//   ) : (
//     <main className="flex">
//       <SideBar></SideBar>
//       <section className="bg-[#F4F4F4] p-4 ml-[10vw] w-screen overflow-scroll  pt-6 md:h-screen md:ml-[20vw] dark:bg-gray-700 dark:text-gray-400 md:overflow-hidden">
//         <Modal isOpen={showModal} onClose={handleCloseModal}>
//           <div className="mt-3 flex w-full">
//             <div className="mt-2 text-center sm:ml-4 sm:text-left w-full">
//               <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
//                 Transfer
//               </h4>
//               <div className="p-4 shadow-md mb-6 bg-gray-200 dark:bg-gray-800 flex justify-between items-center cursor-pointer">
//                 <span>
//                   <FontAwesomeIcon icon={faRightLeft} className="mr-4" />
//                   Transfer to Banky Account
//                 </span>

//                 <FontAwesomeIcon icon={faChevronRight} />
//               </div>

//               <div className="p-4 shadow-md mb-6 bg-gray-200 dark:bg-gray-800 flex justify-between items-center cursor-pointer">
//                 <span>
//                   <FontAwesomeIcon icon={faBuildingColumns} className="mr-4" />
//                   Transfer to Other Banks
//                 </span>

//                 <FontAwesomeIcon icon={faChevronRight} />
//               </div>

//               {/* <div className="items-center gap-2 mt-3 sm:flex">
//                 <button
//                   className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Close
//                 </button>
//               </div> */}
//             </div>
//           </div>
//         </Modal>
//         <section className="flex justify-between items-center w-full h-[10%]  bg-primary-500 rounded-lg p-6 text-white balance-card md:h-40">
//           <div className="w-full ">
//             <p className="text-xs md:text-base ">Main Account Balance</p>

//             <p className="text-xl font-extrabold font-sans md:text3xl">
//               ₦ 500,000,000,000
//             </p>
//           </div>
//           <div className="flex flex-col gap-x-10 md:flex md:flex-row gap-y-4">
//             <button className="flex items-center gap-x-1 bg-white text-[#22285E] px-4 py-2 rounded-lg md:px-8  dark:bg-gray-300">
//               <span className="w-4">
//                 <img src={depositIcon} className="w-full h-full" />
//               </span>
//               <p className="hidden md:block">Deposit</p>
//             </button>
//             <button
//               className="bg-white flex items-center gap-x-1 text-[#22285E] px-4 py-2 rounded-lg md:px-8  dark:bg-gray-300"
//               onClick={handleOpenModal}
//             >
//               <span className="w-4">
//                 <img src={transferIcon} className="w-full h-full" />
//               </span>
//               <p className="hidden md:block">Transfer</p>
//             </button>
//           </div>
//         </section>
//         <section className="flex flex-col w-full my-10 md:flex-row ">
//           <div className="w-full md:w-[70%]">
//             <div className="flex gap-x-4 flex-col w-full md:flex-row">
//               <SummaryCard icon={walletIcon} title="Payments" amount={3000} />
//               <SummaryCard
//                 icon={calculatorIcon}
//                 title="Payments"
//                 amount={300000000}
//               />
//               <SummaryCard icon={clockIcon} title="Payments" amount={3000} />
//             </div>
//             <div className="flex flex-col md:mt-5">
//               <p className="text-2xl dark:text-gray-300">Recent Transactions</p>
//               <TransactionsTable />
//             </div>
//           </div>
//           <div className=" w-full md:w-[30%]">
//             <DebitCard firstName="wd" lastName="kxwo" />
//             <div className="w-full  mt-10">
//               <div>
//                 <ul className="p-4 bg-white drop-shadow-md dark:bg-gray-800">
//                   <h3 className="text-2xl header font-bold dark:text-gray-200">
//                     Top Transactions
//                   </h3>
//                   <li className="flex justify-between py-5 border-b-2">
//                     Waverley Gomby <span className="text-credit">1000</span>
//                   </li>
//                   <li className="flex justify-between py-5 border-b-2">
//                     Waverley Gomby <span className="text-debit">1000</span>
//                   </li>
//                   <li className="flex justify-between py-5 border-b-2">
//                     Waverley Gomby <span className="text-debit">1000</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;

import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import {
  calculatorIcon,
  clockIcon,
  depositIcon,
  transferIcon,
  walletIcon,
} from "../assets/index";
import { DebitCard, Modal, TransactionsTable } from "../components";
import { useState } from "react";
import {
  faChevronRight,
  faBuildingColumns,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const number = 500000000000;
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Layout>
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
              {" "}
              <span>
                <FontAwesomeIcon icon={faBuildingColumns} className="mr-4" />
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
            ₦ {number.toLocaleString()}
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
            <SummaryCard icon={walletIcon} title="Payments" amount={3000} />
            <SummaryCard
              icon={calculatorIcon}
              title="Payments"
              amount={300000000}
            />
            <SummaryCard icon={clockIcon} title="Payments" amount={3000} />
          </div>

          <TransactionsTable />
        </div>
        <div className="cols-1">
          <DebitCard />
          <div className="w-full mt-5">
            <div>
              <ul className="p-4 bg-white drop-shadow-md dark:bg-gray-800">
                <h3 className="text-2xl header font-bold dark:text-gray-200">
                  Top Transactions
                </h3>
                <li className="flex justify-between py-5 border-b-2">
                  Waverley Gomby <span className="text-credit">1000</span>
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
    </Layout>
  );
};

export default Dashboard;
