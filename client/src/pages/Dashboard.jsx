import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const sendRequest = async () => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const res = await axios
      .get("http://localhost:8080/api/v1/users/dashboard", { headers })
      .catch((err) => console.log(err));
    const data = await res.data;
    setUserInfo(data);
    console.log(data);
  };
  useEffect(() => {
    sendRequest();
  }, []);
  const handleLogout = async () => {
    await axios
      .get("http://localhost:8080/api/v1/users/logout")
      .then((response) => {
        // Handle the response
        const data = response.data;
        navigate("/login");
      })
      .catch((error) => {
        // Handle the error
        alert(error.message);
      });
  };
  return !userInfo ? (
    <h2>Loading</h2>
  ) : (
    <div>
      <p>Dashboard</p>
      <h3>Welcome! {userInfo.user.firstName}</h3>
      <h3>AccountBalance:  ₦{userInfo.user.mainAccount.accountBalance}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
