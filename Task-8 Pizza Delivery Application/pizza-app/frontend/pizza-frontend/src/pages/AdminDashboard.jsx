import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Fetch all orders
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
        const revenue = res.data.reduce((sum, o) => sum + o.totalPrice, 0);
        setTotalRevenue(revenue);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    // Fetch all users
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchOrders();
    fetchUsers();
  }, []);

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
        <h1 style={{ fontSize: 42, fontWeight: "bold", color: "#fa8c16" }}>
          👑 Admin Dashboard
        </h1>
        <p style={{ color: "#555", fontSize: 16 }}>
          Manage Users, Orders, Payments & Inventory
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          gap: 30,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* USERS */}
        <div
          style={{ ...cardStyle, background: "linear-gradient(135deg, #ffd666, #ffc107)" }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => navigate("/users")}
        >
          <h2 style={{ color: "#722ed1" }}>👥 Users</h2>
          <p>Total Users: {users.length}</p>
        </div>

        {/* ORDERS */}
        <div
          style={{ ...cardStyle, background: "linear-gradient(135deg, #69c0ff, #40a9ff)" }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => navigate("/orders")}
        >
          <h2 style={{ color: "#0050b3" }}>📦 Orders</h2>
          <p>Total Orders: {orders.length}</p>
          {orders.length > 0 && <p>Last Order: ₹{orders[orders.length - 1].totalPrice}</p>}
        </div>

        {/* PAYMENTS */}
        <div
          style={{ ...cardStyle, background: "linear-gradient(135deg, #95de64, #52c41a)" }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => navigate("/payments")}
        >
          <h2 style={{ color: "#135200" }}>💳 Payments</h2>
          <p>Total Revenue: ₹{totalRevenue}</p>
        </div>

        {/* INVENTORY */}
        <div
          style={{ ...cardStyle, background: "linear-gradient(135deg, #ff85c0, #f759ab)" }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => navigate("/inventory")}
        >
          <h2 style={{ color: "#9e1068" }}>📦 Inventory</h2>
          <p>Manage Pizza Ingredients</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ marginTop: 50, maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
        <h2 style={{ marginBottom: 20, color: "#fa8c16" }}>📝 Recent Orders</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
          <thead style={{ background: "#1890ff", color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px" }}>Order ID</th>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(-5).reverse().map((order) => (
              <tr key={order._id} style={{ textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;