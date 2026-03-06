import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import { PaymentContext } from "../components/PaymentContext"; // ✅ import PaymentContext
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { addPayment } = useContext(PaymentContext); // ✅ addPayment
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      // ✅ Create order in backend
      const res = await axios.post("http://localhost:5000/api/orders/create", {
        userId,
        pizzaDetails: cartItems,
        totalPrice: totalAmount,
        paymentMethod,
      });

      console.log("Order placed:", res.data);

      // ✅ Add payment to PaymentContext
      addPayment({
        id: Date.now() + Math.random(),
        userEmail,
        orderId: res.data._id,
        totalPrice: totalAmount,
        paymentMethod,
        createdAt: new Date().toISOString(),
      });

      // ✅ Clear cart after payment
      setCartItems([]);

      alert("Payment Successful 🎉");

      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>💳 Payment</h2>
        <h3>Total Amount: ₹{totalAmount}</h3>

        <div style={styles.options}>
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>
        </div>

        <button style={styles.payBtn} onClick={handlePayment}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
  },
  card: {
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  options: {
    margin: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  payBtn: {
    padding: "10px",
    width: "100%",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Payment;