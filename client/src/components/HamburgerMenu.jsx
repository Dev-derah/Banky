const HamburgerMenu = () => {
  return (
    <button
      className=" absolute left-0 text-gray-500 hover:text-gray-700 focus:outline-none"
      aria-label="Menu"
    >
      <svg
        className="h-6 w-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
      </svg>
    </button>
  );
};

export default HamburgerMenu;
