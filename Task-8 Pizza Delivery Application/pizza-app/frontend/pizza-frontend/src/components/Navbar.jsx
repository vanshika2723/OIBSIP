import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>🍕 PizzaStore</h2>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>

        {role === "user" && (
          <>
            <Link to="/cart" style={styles.cart}>🛒 Cart ({cartItems.length})</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            <Link to="/builder" style={styles.link}>Pizza Builder</Link>
            <Link to="/menu" style={styles.link}>Menu</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/orders" style={styles.link}>Orders</Link>
            <Link to="/menu" style={styles.link}>Pizza Menu</Link>
            <Link to="/inventory" style={styles.link}>Inventory</Link>
            <Link to="/users" style={styles.link}>Users</Link>
          </>
        )}

        <Link to="/profile" style={styles.link}>Profile</Link>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 40px", background: "#ff4d4f", color: "#fff", boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
  },
  logo: { margin: 0, fontSize: "24px", fontWeight: "bold" },
  links: { display: "flex", alignItems: "center", gap: "20px" },
  link: { color: "#fff", textDecoration: "none", fontWeight: "500", fontSize: "15px" },
  cart: { color: "#fff", textDecoration: "none", fontWeight: "600", background: "#d9363e", padding: "6px 10px", borderRadius: "6px" },
  logoutBtn: { padding: "6px 12px", border: "none", borderRadius: "6px", background: "#fff", color: "#ff4d4f", fontWeight: "bold", cursor: "pointer" }
};

export default Navbar;