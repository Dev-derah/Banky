import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cardLogo } from "../assets";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const DebitCard = ({ firstName, lastName }) => {
  const [showDetails, setShowDetails] = useState(false); // State for toggle

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };
  const buttonLabel = showDetails ? "Hide Card Details" : "Show Card Details";
  const renderCardNumber = () => {
    if (showDetails) {
      return "1234 5678 9012 3456"; // Show actual card number
    } else {
      return "#### #### #### ####"; // Show masked card number
    }
  };

  const renderCardHolder = () => {
    if (showDetails) {
      return `${firstName} ${lastName}`; // Show actual card holder name
    } else {
      return "*********"; // Show masked card holder name
    }
  };

  const renderCardExpiry = () => {
    if (showDetails) {
      return "12/24"; // Show actual card expiry
    } else {
      return "**/**"; // Show masked card expiry
    }
  };

  const renderCardCVV = () => {
    if (showDetails) {
      return "123"; // Show actual CVV
    } else {
      return "***"; // Show masked CVV
    }
  };
  return (
    <div className="w-full">
      <div className="card w-full h-52 bg-[#222831] rounded-2xl relative text-secondary lg:max-w-[350px]">
        <div className="card-top absolute right-6 top-6 text-sm">
          <p>Debit</p>
        </div>
        <div className="card-middle absolute left-6 bottom-20 text-lg ">
          <p className="font-bold font-sans">
            {renderCardNumber()}
            {showDetails && (
              <FontAwesomeIcon icon={faCopy} className="ml-1 cursor-pointer" />
            )}
          </p>
          <p className="mt-2 text-sm">{renderCardHolder()}</p>
        </div>
        <div className="card-bottom absolute left-6 bottom-3 flex items-center justify-between w-[86%]">
          <div className="flex items-center">
            <div className=" flex flex-col mr-2">
              <span className="text-xs">EXPIRY</span>
              <p>{renderCardExpiry()}</p>
            </div>
          </div>
          <div className=" flex flex-col mr-2">
            <span className="text-xs">CVV</span>
            <p>{renderCardCVV()}</p>
          </div>
          <img src={cardLogo} alt="mastercard-logo"/>
        </div>
      </div>
      <div className="mt-4">
        <label
          type="button"
          id="toggle"
          className="dark:text-gray-300 mr-3 transition-all ease-in duration-300"
          aria-pressed={showDetails}
          aria-label={buttonLabel}
          onClick={handleToggle}
        >
          {buttonLabel}
        </label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle-checkbox"
            onChange={handleToggle}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle-checkbox"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
          ></label>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
