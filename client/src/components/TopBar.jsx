import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars,faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { bankyLogo } from "../assets/index";

const TopBar = ({ showNav, setShowNav, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-gray-800 fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] z-20">
      <div className=" xs:mx-0 mx-2 my-2 flex items-center w-8 h-8 md:w-16 md:h-10 md:my-8">
        {isMobile && (
          <div className="xs:px-2 px-4">
            <FontAwesomeIcon
              icon={faBars}
              className="xs:h-5 xs:w-5 h-8 w-8 text-gray-700 cursor-pointer"
              onClick={() => setShowNav(!showNav)}
            />
          </div>
        )}
        <img src={bankyLogo} className="xs:mr-1 mr-2" alt="Banky-logo"/>
        <p className="xs:text-sm text-2xl">Banky</p>
      </div>

      <div className="flex items-center pr-4 md:pr-16">
        <div className="relative inline-block">
          <button
            className="flex items-center focus:outline-none"
            onClick={toggleDropdown}
            aria-label="User Profile"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="xs:p-1 xs:w-2 xs:h-2 xs:mr-1 mr-2 bg-gray-300 p-2 rounded-full text-red-500"
            />
            <span className="xs:text-sm text-lg font-sans">
              John Doe
              <FontAwesomeIcon icon={faChevronDown} className="w-3 ml-2 " />
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-lg dark:bg-gray-300">
              {/* Dropdown menu items */}
              <button className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:text-gray-600">
                Edit Profile
              </button>
              <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:text-gray-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
