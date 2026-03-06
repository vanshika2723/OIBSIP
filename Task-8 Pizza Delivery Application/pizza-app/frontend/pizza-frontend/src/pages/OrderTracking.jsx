import React, { useEffect, useState } from "react";

function OrderTracking() {

  const steps = [
    "Order Placed",
    "Preparing",
    "Out for Delivery",
    "Delivered"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f7fa"
    }}>

      <h1>🚚 Order Tracking</h1>

      <div style={{marginTop:40}}>

        {steps.map((step,index)=>(
          <div key={index} style={{
            padding:15,
            margin:10,
            width:250,
            borderRadius:10,
            background:index<=currentStep ? "#52c41a" : "#ddd",
            color:index<=currentStep ? "white" : "#555",
            textAlign:"center",
            fontWeight:"bold",
            transition:"0.4s"
          }}>
            {step}
          </div>
        ))}

      </div>

    </div>
  );
}

export default OrderTracking;