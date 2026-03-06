import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  const role = localStorage.getItem("role"); // admin/user
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // fetch user orders
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
        setOrders(res.data);

        const paymentSum = res.data.reduce((sum, o) => sum + o.totalPrice, 0);
        setTotalPayment(paymentSum);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [userId]);

  const cardStyle = {
    background: "linear-gradient(135deg, #fff, #f0f2f5)",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 50 }}>
        <h1 style={{ fontSize: 42, fontWeight: "bold", color: "#1890ff" }}>
          🍕 Dashboard
        </h1>
        <p style={{ color: "#555", fontSize: 16 }}>
          {role === "admin" ? "Admin Panel" : "Welcome! Manage your cart, orders, and explore menu."}
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          gap: 30,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* CART */}
        <div
          style={{ ...cardStyle, cursor: cartItems.length ? "pointer" : "not-allowed", opacity: cartItems.length ? 1 : 0.6 }}
          onClick={() => cartItems.length && navigate("/cart")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <h2 style={{ color: "#52c41a" }}>🛒 My Cart</h2>
          <p>{cartItems.length ? `${cartItems.length} item(s)` : "Cart is empty"}</p>
          {cartItems.length > 0 && (
            <p style={{ fontWeight: "bold", color: "#28a745" }}>
              Total: ₹{cartItems.reduce((t, i) => t + i.price, 0)}
            </p>
          )}
        </div>

        {/* ORDERS */}
        <div style={cardStyle} onClick={() => navigate("/orders")} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <h2 style={{ color: "#fa8c16" }}>📦 My Orders</h2>
          <p>Total Orders: {orders.length}</p>
          {orders.length > 0 && <p>Last Order: ₹{orders[orders.length - 1].totalPrice}</p>}
        </div>

        {/* PAYMENT */}
        <div style={cardStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <h2 style={{ color: "#1890ff" }}>💳 Payment</h2>
          <p>Total Paid: ₹{totalPayment}</p>
        </div>

        {/* ADMIN CARD */}
        {role === "admin" && (
          <div
            style={{ ...cardStyle, background: "linear-gradient(135deg, #ffd666, #ffc107)" }}
            onClick={() => navigate("/inventory")}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <h2 style={{ color: "#722ed1" }}>👑 Admin Panel</h2>
            <p>Manage Users, Orders & Inventory</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;