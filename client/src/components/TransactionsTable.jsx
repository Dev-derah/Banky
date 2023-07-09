import { useNavigate } from "react-router-dom";
import { formatCurrency, transactionsData } from "../../utils/data";
import { noTransactions } from "../assets";

const TransactionsTable = () => {
  const navigate = useNavigate();

  return (
    <>
      {transactionsData.length !== 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3" colSpan={2}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map(({ id, name, amount, type, date }) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {name}
                  </th>
                  <td className="px-6 py-4">{type}</td>
                  <td
                    className={`px-6 py-4 ${
                      type === "Debit"
                        ? "text-red-500 dark:text-red-700"
                        : "text-green-500 dark:text-green-700"
                    }`}
                  >
                    {formatCurrency(amount)}
                  </td>
                  <td className="px-6 py-4">
                    {date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={5}
                  className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 md:py-2 text-center"
                >
                  <button
                    onClick={() => navigate("/transactions")}
                    className="text-primary-500"
                  >
                    View more transactions
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <section className="hidden h-full w-full md:flex flex-col items-center">
          <img
            src={noTransactions}
            alt="No transactions"
            className="md:h-60 md:w-40"
          />
          <p>You have not performed any transactions</p>
        </section>
      )}
    </>
  );
};

export default TransactionsTable;
