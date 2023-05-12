const SummaryCard = ({ icon, title, amount }) => {
  return (
    <div className="flex w-full h-20 gap-x-4 bg-white border border-[#DADADA] px-2 py-4 mb-4 rounded-md md:w-[30%]">
      <div className="flex justify-center items-center p-4 rounded-lg bg-lightRed">
        <img src={icon} className="w-full h-full" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-lightGrey ">{title}</p>
        <h3 className="font-bold font-sans text-md md:text-xl "> ₦{amount}</h3>
      </div>
    </div>
  );
};

export default SummaryCard;
