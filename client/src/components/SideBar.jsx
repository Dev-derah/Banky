/* eslint-disable react/prop-types */
import { bankyLogo,dashboardIcon, investmentsIcon, logoutIcon, savingsIcon, transactionsIcon } from "../assets/index";
import axios from 'axios'
import { useNavigate,NavLink } from "react-router-dom";

const SideBar = (props) => {
    const navigate = useNavigate();
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
  return (
    <div className="flex">
      <div className=" flex flex-col justify-between w-[10vw] md:w-[20%]">
        <div className="h-full">
          <div className="m-8 flex items-center">
            <img src={bankyLogo} />
            <p className="text-2xl">Banky</p>
          </div>
          <ul className="flex flex-col mt-10">
            <NavLink to="/dashboard" activestyle="active" className="p-1 flex md:p-4">
              <span>
                <img src={dashboardIcon} className="w-6 mr-4" />
              </span>
              <p className="hidden md:block">Dashboard</p>
            </NavLink>
            <NavLink
              to="/transactions"
              activestyle="active"
              className="p-4 flex"
            >
              <span>
                <img src={transactionsIcon} className="w-6 mr-4" />
              </span>
              <p className="hidden md:block">Transactions</p>
            </NavLink>
            <NavLink to="/savings" activestyle="active" className="p-4 flex">
              <span>
                <img src={savingsIcon} className="w-6 mr-4" />
              </span>
              <p className="hidden md:block">Savings</p>
            </NavLink>
            <NavLink
              to="/investments"
              activestyle="active"
              className="p-4 flex"
            >
              <span>
                <img src={investmentsIcon} className="w-6 mr-4" />
              </span>
              <p className="hidden md:block">Investments</p>
            </NavLink>
          </ul>
        </div>
        <div className="border-t-2 py-4 px-2">
          <button onClick={handleLogout} className="flex items-center gap-3">
            <span>
              <img src={logoutIcon} />
            </span>
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
      <div className="w-[90vw] md:w-[80%]">{props.children}</div>
    </div>
  );
}

export default SideBar