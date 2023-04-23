import { Inter } from 'next/font/google';
  import React from "react";
  import { usePaystackPayment } from "react-paystack";
  const config = {
    email: "test@email.com",
    amount: 1000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
          className="bg-blue-500 text-white p-4"
        >
          Fund account
        </button>
      </div>
    );
  };

  function App() {
    return (
      <div className="App">
        <PaystackHookExample />
      </div>
    );
  }

  export default App;