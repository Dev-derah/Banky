import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardLayout = ({ children }) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 767) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <SideBar showNav={showNav} />
      <TopBar showNav={showNav} setShowNav={setShowNav} isMobile={isMobile} />
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        {!isMobile && (
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`bg-gray-500 cursor-pointer p-2 rounded-lg h-6 mt-6 ml-2 transition-all duration-500 z-10 fixed hover:bg-gray-400 hover:text-gray-600 ${
              showNav ? "transform rotate-180" : null
            }`}
            onClick={() => {
              setShowNav(!showNav);
            }}
          />
        )}

        <div className="px-4 md:px-16 md:min-h-screen">{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
