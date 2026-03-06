import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PaymentContext } from "../components/PaymentContext"; // ✅ import PaymentContext

function Orders() {
  const navigate = useNavigate();
  const { addPayment, payments } = useContext(PaymentContext); // ✅ get addPayment function
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userEmail = localStorage.getItem("userEmail"); // for payment context
        if (!userId) {
          console.log("No userId found in localStorage");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`
        );

        const fetchedOrders = res.data;
        setOrders(fetchedOrders); // update orders state

        // ✅ create payment for each order if not already in PaymentContext
        fetchedOrders.forEach((order) => {
          const exists = payments.find((p) => p.orderId === order._id);
          if (!exists) {
            addPayment({
              id: Date.now() + Math.random(), // unique id
              userEmail: userEmail,
              orderId: order._id,
              totalPrice: order.totalPrice,
              paymentMethod: order.paymentMethod || "COD",
              createdAt: order.createdAt,
            });
          }
        });
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [addPayment, payments]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders yet 🍕</p>
      ) : (
        <div style={styles.grid}>
          {orders.map((order) => (
            <div key={order._id} style={styles.card}>
              <h3>🍕 Pizza Order</h3>

              <p>
                <b>Total:</b> ₹{order.totalPrice}
              </p>
              <p>
                <b>Payment:</b> {order.paymentMethod || "COD"}
              </p>
              <p>
                <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
              </p>

              <p style={styles.status}>{order.status}</p>

              <p>
                <b>Items:</b>
              </p>
              <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                {order.pizzaDetails.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity} (₹{item.price})
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/order-tracking")}
                style={styles.trackBtn}
              >
                Track Order 🚚
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#f4f6f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    justifyContent: "center",
  },
  card: {
    width: "300px",
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  status: {
    color: "#ff9800",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  trackBtn: {
    padding: "10px 16px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.2s",
  },
};

export default Orders;