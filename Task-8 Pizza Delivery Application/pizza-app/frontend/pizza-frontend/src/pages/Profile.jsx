import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");

    if (!savedEmail) {
      navigate("/login");
    } else {
      setUser({ name: savedName, email: savedEmail });
      setName(savedName);
    }
  }, [navigate]);
const [orders, setOrders] = useState([]);
const [totalPayment, setTotalPayment] = useState(0);

useEffect(() => {
  const fetchOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
      setOrders(res.data);

      const total = res.data.reduce((acc, order) => acc + order.totalPrice, 0);
      setTotalPayment(total);

    } catch (err) {
      console.error(err);
    }
  };

  fetchOrders();
}, []);
  const handleUpdate = () => {
    localStorage.setItem("userName", name);
    setUser((prev) => ({ ...prev, name }));
    setSuccess("✅ Profile updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Avatar */}
        <div style={styles.avatarContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="avatar"
            style={styles.avatar}
          />
        </div>

        {/* Name & Email */}
        <h2 style={styles.title}>👤 My Profile</h2>
        <p style={styles.email}>{user.email}</p>
        {success && <p style={styles.success}>{success}</p>}

        {/* Form */}
        <div style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          onClick={handleUpdate}
          style={styles.updateBtn}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#218838")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#28a745")}
        >
          Update Profile
        </button>

        {/* Quick Access Cards */}
        <div style={styles.quickAccess}>
          <div style={styles.cardBtn} onClick={() => navigate("/orders")}>
            📦 My Orders
          </div>
          <div style={styles.cardBtn} onClick={() => navigate("/cart")}>
            🛒 Go to Cart
          </div>
          
          
                <button
  onClick={() => navigate("/payment")}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  }}
>
  Total Payments: ₹{totalPayment} 💳
</button>
         
        </div>

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#c82333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#dc3545")}
        >
          Logout
        </button>

  
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', Arial, sans-serif",
    padding: "20px",
  },
  card: {
    width: "420px",
    background: "#fff",
    borderRadius: "25px",
    padding: "40px 30px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
    border: "3px solid #ff5e62",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  title: { color: "#ff5e62", marginBottom: "5px", fontSize: "24px", fontWeight: "600" },
  email: { color: "#555", marginBottom: "20px", fontSize: "16px" },
  success: { color: "green", fontWeight: "bold", marginBottom: "15px" },
  form: { textAlign: "left" },
  label: { fontWeight: "500", marginBottom: "5px", display: "block", fontSize: "14px" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "0.3s",
  },
  updateBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  logoutBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#dc3545",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  quickAccess: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
    flexWrap: "wrap",
  },
  cardBtn: {
    flex: "1 1 30%",
    background: "#1890ff",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "0.3s",
  },
};

export default Profile;