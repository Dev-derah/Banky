import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
    const [bank, setBank] = useState(null);
  const navigate = useNavigate();

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
    sendRequest()
  }, []);

    useEffect(() => {
      getBanks()
    }, []);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:8080/api/v1/users/logout")
      .then(() => {
        // Handle the response
        navigate("/login");
      })
      .catch((error) => {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log("An error occurred:", error.message);
      }
      });
  };

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
      <div>
        <p>Dashboard</p>
        <h3>Welcome! {userInfo.firstName}</h3>
        <h3>AccountBalance: ₦{userInfo.mainAccount.accountBalance}</h3>
        <button onClick={handleLogout}>Logout</button>
        <h4>Banks</h4>
        {bank.map(function (item) {
          return <li key={item.id}>{item.name}</li>;
        })}
      </div>
    </SideBar>
  );
};

export default Dashboard;
