// import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { sideBarItems } from "../../utils/data";
const SideBar = ({ showNav,setShowNav }) => {

  return (
    <nav
      className={`w-1/2 fixed min-h-screen mt-16 md:w-56 dark:bg-gray-800 dark:text-gray-400 transition-all duration-[400ms] z-20 ${
        !showNav ? "-left-full" : "left-0"
      }`}
    >
      <div>
        <ul className="flex flex-col mt-4">
          {sideBarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                activestyle="active"
                className="sidebar-item p-2 my-2 flex hover:text-primary-500 transition-colors duration-200 ease-in-out md:p-4"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="xs:mr-2 xs:w-4 w-6 mr-4 text-red-150 hover:text-primary-500"
                />

                <p className="xs:text-sm">{item.label}</p>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="border-t-2 py-4 px-2 fixed w-1/2 bottom-0 md:w-56">
          <button
            className="flex items-center gap-3 w-full"
            aria-label="Logout"
          >
            <span>
              <FontAwesomeIcon
                className="sidebar-icon"
                icon={faRightFromBracket}
                onClick={() => setShowNav(!showNav)}
              />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SideBar