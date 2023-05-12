import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import SummaryCard from "../components/SummaryCard";
import {
  calculatorIcon,
  cardLogo,
  clockIcon,
  depositIcon,
  transferIcon,
  walletIcon,
} from "../assets/index";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  // const [bank, setBank] = useState();
  //   const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const sendRequest = async () => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    await axios
      .get("http://localhost:8080/api/v1/users/dashboard", { headers })
      .then((res) => {
        const data = res.data;
        setUserInfo(data.user);
        console.log(data.user);
      })
      .catch((error) => {
        // Handle error response
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("An error occurred:", error.message);
        }
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = async () => {
    await axios
      .get("https://api.paystack.co/bank")
      .then((res) => {
        setBank(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("An error occurred:", error.message);
        }
      });
  };
  return !userInfo ? (
    <h2>Loading</h2>
  ) : (
    <SideBar>
      <main className="bg-[#F4F4F4] p-8 h-screen">
        <section className="flex justify-between items-center w-full h-[30%]  bg-primary-500 rounded-lg p-6 text-white balance-card md:h-40">
          <div className="w-full ">
            <p className="text-xs md:text-base ">Main Account Balance</p>
            <p className="text-xl font-extrabold font-sans md:text3xl">
              ₦ 500,000,000,000
            </p>
          </div>
          <div className="flex flex-col gap-x-10 md:flex md:flex-row gap-y-4">
            <button className="flex items-center gap-x-1 bg-white text-[#22285E] px-4 py-2 rounded-lg md:px-8">
              <span className="w-4">
                <img src={depositIcon} className="w-full h-full" />
              </span>
              <p className="hidden md:block">Deposit</p>
            </button>
            <button className="bg-white flex items-center gap-x-1 text-[#22285E] px-4 py-2 rounded-lg md:px-8">
              <span className="w-4">
                <img src={transferIcon} className="w-full h-full" />
              </span>
              <p className="hidden md:block">Transfer</p>
            </button>
          </div>
        </section>
        {/* {bank.map(function (item) {
          return <li key={item.id}>{item.name}</li>;
        })} */}
        <section className="flex flex-col w-full my-10 md:flex-row ">
          <div className="w-full md:w-[70%]">
            <div className="flex gap-x-4 flex-col w-full md:flex-row">
              <SummaryCard icon={walletIcon} title="Payments" amount={3000} />
              <SummaryCard
                icon={calculatorIcon}
                title="Payments"
                amount={3000}
              />
              <SummaryCard icon={clockIcon} title="Payments" amount={3000} />
            </div>
          </div>
          <div className="w-full md:w-[30%]">
            <div className="card w-full h-52 bg-[#222831] rounded-2xl relative text-secondary">
              <div className="card-top absolute right-6 top-6 text-sm">
                <p>Debit</p>
              </div>
              <div className="card-middle absolute left-6 bottom-20 text-lg">
                <p className="font-bold font-sans">7269 1927 1822 8193</p>
                <p className="mt-2 text-sm">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
              </div>
              <div className="card-bottom absolute left-6 bottom-3 flex items-center justify-between w-[86%]">
                <div className="flex items-center">
                  <div className=" flex flex-col mr-2">
                    <span className="text-xs">EXPIRY</span>
                    <p>03/26</p>
                  </div>
                </div>
                <div className=" flex flex-col mr-2">
                  <span className="text-xs">CVV</span>
                  <p>026</p>
                </div>
                <img src={cardLogo} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SideBar>
  );
};

export default Dashboard;
