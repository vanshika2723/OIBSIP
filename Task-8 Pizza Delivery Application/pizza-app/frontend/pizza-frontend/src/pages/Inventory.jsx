// src/pages/Inventory.jsx
import React, { useState } from "react";
import API from "../api/api"; // Make sure your API instance is set up

// Example images (replace with your own assets)
import thinCrustImg from "../assets/base/thin-crust.png";
import cheeseBurstImg from "../assets/base/cheese-burst.png";
import tomatoImg from "../assets/sauce/tomato.png";
import capsicumImg from "../assets/veggies/capsicum.png";
import mozzarellaImg from "../assets/cheese/mozzarella.png";
import veganImg from "../assets/cheese/vegan.png";
import onionImg from "../assets/veggies/onion.png";
import oliveImg from "../assets/veggies/olive.png";

function Inventory() {
  const [items, setItems] = useState([
    { _id: 1, name: "Thin Crust", quantity: 10 },
    { _id: 2, name: "Cheese Burst", quantity: 3 },
    { _id: 3, name: "Tomato Sauce", quantity: 8 },
    { _id: 4, name: "Capsicum", quantity: 2 },
    { _id: 5, name: "Mozzarella Cheese", quantity: 6 },
    { _id: 6, name: "Vegan Cheese", quantity: 4 },
    { _id: 7, name: "Onion", quantity: 5 },
    { _id: 8, name: "Olives", quantity: 3 },
  ]);

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty >= 0) {
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  // SAVE ALL CHANGES FUNCTION
  const handleSaveAll = async () => {
    try {
      // Send updated inventory to backend
      await API.put("/inventory/update", { items });
      alert("Inventory updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update inventory. Check console for details.");
    }
  };

  const getItemImage = (name) => {
    name = name.toLowerCase();
    if (name.includes("thin")) return thinCrustImg;
    if (name.includes("cheese burst")) return cheeseBurstImg;
    if (name.includes("tomato")) return tomatoImg;
    if (name.includes("capsicum")) return capsicumImg;
    if (name.includes("mozzarella")) return mozzarellaImg;
    if (name.includes("vegan")) return veganImg;
    if (name.includes("onion")) return onionImg;
    if (name.includes("olive")) return oliveImg;
    return "";
  };

  return (
    <div className="inventory-container">
      <h1>📦 Inventory Management</h1>

      <div className="inventory-grid">
        {items.map((item) => {
          const lowStock = item.quantity < 5;
          return (
            <div
              key={item._id}
              className={`inventory-card ${lowStock ? "low-stock" : ""}`}
            >
              <img src={getItemImage(item.name)} alt={item.name} className="item-img" />
              <h3>{item.name}</h3>
              <p><strong>Quantity:</strong></p>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                className="quantity-input"
              />
              {lowStock && <span className="low-badge">⚠ Low Stock</span>}
            </div>
          );
        })}
      </div>

      <div className="save-button-container">
        <button className="save-button" onClick={handleSaveAll}>
          💾 Save All Changes
        </button>
      </div>

      <style>{`
        .inventory-container {
          padding: 50px;
          font-family: 'Arial', sans-serif;
          background: #e8f0fe;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          margin-bottom: 50px;
          color: #1890ff;
          font-size: 2.5rem;
        }

        .inventory-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
        }

        .inventory-card {
          background: linear-gradient(145deg, #ffffff, #d9e6ff);
          padding: 25px 20px;
          width: 230px;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
          position: relative;
        }

        .inventory-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 30px rgba(0,0,0,0.2);
        }

        .inventory-card.low-stock {
          border: 2px solid #ff4d4f;
        }

        .inventory-card h3 {
          margin: 12px 0;
          color: #333;
          font-size: 1.3rem;
        }

        .item-img {
          width: 110px;
          height: 110px;
          object-fit: contain;
          margin-bottom: 12px;
        }

        .quantity-input {
          width: 70px;
          padding: 6px;
          font-size: 1rem;
          text-align: center;
          border-radius: 8px;
          border: 1px solid #1890ff;
          margin-bottom: 10px;
          outline: none;
        }

        .quantity-input:focus {
          border-color: #52c41a;
          box-shadow: 0 0 5px rgba(82,196,26,0.5);
        }

        .low-badge {
          display: inline-block;
          margin-top: 5px;
          padding: 3px 8px;
          background-color: #ff4d4f;
          color: #fff;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: bold;
          position: absolute;
          top: 15px;
          right: 15px;
        }

        .save-button-container {
          text-align: center;
          margin-top: 40px;
        }

        .save-button {
          background-color: #1890ff;
          color: #fff;
          padding: 12px 25px;
          font-size: 1.2rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, transform 0.2s;
        }

        .save-button:hover {
          background-color: #40a9ff;
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .inventory-grid {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Inventory;