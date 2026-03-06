// src/components/PaymentContext.jsx
import React, { createContext, useState } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]); // initially empty

  const addPayment = (payment) => {
    setPayments((prev) => [...prev, payment]);
  };

  return (
    <PaymentContext.Provider value={{ payments, addPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};