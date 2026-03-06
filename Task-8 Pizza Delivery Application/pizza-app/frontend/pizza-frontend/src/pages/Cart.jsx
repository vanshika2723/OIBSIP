import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
const navigate = useNavigate();
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty</p>
      ) : (
        <>
          <div style={styles.grid}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <img
                  src={item.baseImage}
                  alt="Pizza"
                  style={styles.image}
                />

                <h3>{item.name}</h3>
                <p>Cheese: {item.cheese}</p>
                <p>Sauce: {item.sauce ? "Yes" : "No"}</p>
                <p>
                  Veggies:{" "}
                  {item.veggies.length > 0
                    ? item.veggies.join(", ")
                    : "None"}
                </p>
                <p style={styles.price}>₹{item.price}</p>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 style={styles.total}>
            Total Amount: ₹{getTotalAmount()}
          </h3>
          <button 
  style={styles.payBtn}
  onClick={() => navigate("/payment")}
>
  Proceed to Payment 💳
</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    width: "250px",
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  price: {
    fontWeight: "bold",
    color: "#ff4d4f",
  },
  removeBtn: {
    marginTop: "10px",
    padding: "8px",
    width: "100%",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  total: {
    textAlign: "center",
    marginTop: "30px",
    color: "#ff4d4f",
  },
 payBtn: {
  marginTop: "20px",
  padding: "10px 30px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "220px",
},
};

export default Cart;