const SummaryCard = ({ icon, title, amount }) => {
  return (
    <div className="flex w-full h-20 gap-x-4 bg-white border border-[#DADADA] px-2 py-4 mb-4 rounded-md md:w-[33.3%] md:gap-x-2 dark:bg-gray-800 dark:text-gray-200">
      <div className="flex justify-center items-center p-4 rounded-lg bg-lightRed dark:bg-red-400">
        <img src={icon} className="w-full h-full" alt={title}/>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-xs text-lightGrey">{title}</p>
        <h3
          className="font-bold font-sans text-md md:text-lg"
          style={{ fontSize: "calc(30% + 0.8rem)" }}
        >
          ₦{amount}
        </h3>
      </div>
    </div>
  );
};

export default SummaryCard;
