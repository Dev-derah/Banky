// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = async()=>{
        await axios
          .get("http://localhost:8080/api/v1/users/logout")
          .then((response) => {
            // Handle the response
            const data = response.data;
            console.log(data)
            navigate('/login');
          })
          .catch((error) => {
            // Handle the error
            alert(error.message);
          });
    }
  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
