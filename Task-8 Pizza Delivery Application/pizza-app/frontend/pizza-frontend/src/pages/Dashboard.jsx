import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../components/CartContext";
import { useNavigate, Link } from "react-router-dom";

function Dashboard({ role }) {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // ---------------- fetch orders ----------------
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      fetch("/api/orders") // your backend endpoint
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error(err));
    }
  }, [role]);

  // ---------------- compute payments ----------------
  const payments = orders.filter(order => order.status === "Paid");
  const totalPayments = payments.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalTransactions = payments.length;
  const lastPaymentDate = payments.length
    ? new Date(payments[payments.length - 1].createdAt).toLocaleDateString()
    : "No payments yet";

  // ---------------- card styles ----------------
  const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
  };

  const handleHover = (e) => { e.currentTarget.style.transform = "translateY(-8px)"; };
  const handleLeave = (e) => { e.currentTarget.style.transform = "translateY(0)"; };

  // ---------------- dashboard cards ----------------
  const cards =
    role === "admin"
      ? [
          { title: "📊 Inventory", desc: "Check/update stock", onClick: () => navigate("/inventory"), color: "#1890ff" },
          { title: "👤 Users", desc: "View/manage users", onClick: () => navigate("/users"), color: "#52c41a" },
          {
            title: "💰 Payments",
            desc: `₹${totalPayments} | ${totalTransactions} txns | Last: ${lastPaymentDate}`,
            color: "#fa8c16",
            onClick: null,
          },
        ]
      : [
          { title: "🛒 My Cart", desc: cartItems.length ? `${cartItems.length} item(s) in cart` : "Cart is empty", onClick: () => cartItems.length && navigate("/cart"), color: "#52c41a", disabled: cartItems.length === 0 },
          { title: "📦 My Orders", desc: "Track previous orders", onClick: () => navigate("/orders"), color: "#fa8c16" },
          { title: "🍕 Pizza Builder", desc: "Create custom pizza", link: "/builder", color: "#1890ff" },
          { title: "📋 Pizza Menu", desc: "Browse pizzas", link: "/menu", color: "#722ed1" },
        ];

  return (
    <div style={{ minHeight: "100vh", padding: "50px 20px", fontFamily: "Arial, sans-serif", background: "#f0f2f5" }}>
      <header style={{ textAlign: "center", marginBottom: 50 }}>
        <h1 style={{ fontSize: 42, fontWeight: "bold", color: "#1890ff" }}>
          {role === "admin" ? "🛠 Admin Dashboard" : "🍕 Pizza App Dashboard"}
        </h1>
        <p style={{ fontSize: 18, color: "#555" }}>
          {role === "admin" ? "Manage orders, users, menu, and payments." : "Manage your cart, explore menu, and track orders."}
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: 30, maxWidth: 1100, margin: "0 auto" }}>
        {cards.map((card, idx) =>
          card.link ? (
            <Link key={idx} to={card.link} style={{ textDecoration: "none", color: "black" }}>
              <div style={cardStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <h2 style={{ color: card.color }}>{card.title}</h2>
                <p>{card.desc}</p>
              </div>
            </Link>
          ) : (
            <div
              key={idx}
              style={{ ...cardStyle, cursor: card.onClick ? "pointer" : "default", opacity: card.onClick === null ? 0.9 : 1 }}
              onClick={card.onClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <h2 style={{ color: card.color }}>{card.title}</h2>
              <p>{card.desc}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;