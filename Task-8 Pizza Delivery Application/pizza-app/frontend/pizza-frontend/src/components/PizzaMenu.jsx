import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import thinCrust from "../assets/base/thin-crust.png";
import cheeseBurst from "../assets/base/cheese-burst.png";
import thickCrust from "../assets/base/thick-crust.png";

function PizzaMenu() {
  const { addToCart } = useContext(CartContext);

  const menu = [
    { id: 1, name: "Thin Crust Classic", description: "Crispy thin crust with rich tomato flavor.", image: thinCrust, price: 200 },
    { id: 2, name: "Cheese Burst Deluxe", description: "Loaded with extra molten cheese inside.", image: cheeseBurst, price: 250 },
    { id: 3, name: "Thick Crust Special", description: "Soft thick crust for extra satisfaction.", image: thickCrust, price: 230 },
    { id: 4, name: "Pepperoni Feast", description: "Classic pepperoni with mozzarella.", image: thinCrust, price: 270 },
    { id: 5, name: "Veggie Supreme", description: "Loaded with bell peppers, olives, and onions.", image: cheeseBurst, price: 240 },
    { id: 6, name: "Margherita", description: "Simple cheese and tomato delight.", image: thickCrust, price: 180 },
    { id: 7, name: "BBQ Chicken Pizza", description: "Chicken, BBQ sauce, and cheese.", image: thinCrust, price: 280 },
    { id: 8, name: "Paneer Tikka Pizza", description: "Indian style spiced paneer topping.", image: cheeseBurst, price: 260 },
    { id: 9, name: "Mediterranean", description: "Olives, feta, sun-dried tomatoes.", image: thickCrust, price: 300 },
    { id: 10, name: "Hawaiian Delight", description: "Ham, pineapple, and mozzarella.", image: thinCrust, price: 250 },
    { id: 11, name: "Spicy Veggie", description: "Chili peppers, corn, and onions.", image: cheeseBurst, price: 230 },
    { id: 12, name: "Double Cheese", description: "Extra cheese for cheese lovers.", image: thickCrust, price: 220 },
    { id: 13, name: "Chicken Sausage", description: "Sausage slices with mozzarella.", image: thinCrust, price: 270 },
    { id: 14, name: "Mexican Fiesta", description: "Corn, beans, jalapenos, and salsa.", image: cheeseBurst, price: 260 },
    { id: 15, name: "Pesto Veggie", description: "Basil pesto with fresh veggies.", image: thickCrust, price: 280 },
    { id: 16, name: "Garlic Chicken", description: "Garlic sauce with chicken chunks.", image: thinCrust, price: 290 },
    { id: 17, name: "Cheesy Mushroom", description: "Mushrooms with extra cheese.", image: cheeseBurst, price: 240 },
    { id: 18, name: "Veggie Lovers", description: "All veggies you can imagine.", image: thickCrust, price: 250 },
    { id: 19, name: "Tandoori Chicken", description: "Indian tandoori flavored chicken.", image: thinCrust, price: 300 },
    { id: 20, name: "Four Cheese", description: "Mozzarella, cheddar, feta, parmesan.", image: cheeseBurst, price: 320 },
    { id: 21, name: "Italiano", description: "Classic Italian herbs and tomato sauce.", image: thickCrust, price: 240 },
    { id: 22, name: "Spinach & Feta", description: "Healthy spinach with feta cheese.", image: thinCrust, price: 230 },
    { id: 23, name: "Chicken Tikka", description: "Spiced chicken tikka with onions.", image: cheeseBurst, price: 280 },
    { id: 24, name: "Veggie Italiano", description: "Italian herbs with assorted veggies.", image: thickCrust, price: 250 },
    { id: 25, name: "Pepperoni Supreme", description: "Pepperoni with bell peppers.", image: thinCrust, price: 300 },
    { id: 26, name: "Cheese & Corn", description: "Sweet corn with melted cheese.", image: cheeseBurst, price: 220 },
    { id: 27, name: "Chicken BBQ Twist", description: "BBQ chicken with a twist of herbs.", image: thickCrust, price: 290 },
    { id: 28, name: "Paneer Masala", description: "Paneer with spicy masala topping.", image: thinCrust, price: 260 },
    { id: 29, name: "Mushroom Delight", description: "Fresh mushrooms with rich tomato sauce.", image: cheeseBurst, price: 240 },
    { id: 30, name: "Veggie Hawaiian", description: "Pineapple and mixed veggies.", image: thickCrust, price: 250 },
    { id: 31, name: "Chicken Fiesta", description: "Chicken, peppers, and jalapenos.", image: thinCrust, price: 280 },
    { id: 32, name: "Supreme Veggie", description: "Onions, peppers, olives, corn.", image: cheeseBurst, price: 260 },
    { id: 33, name: "Classic Margherita", description: "Tomato, basil, mozzarella.", image: thickCrust, price: 180 },
    { id: 34, name: "Cheese Lovers", description: "Extra mozzarella and cheddar.", image: thinCrust, price: 240 },
    { id: 35, name: "Spicy Chicken", description: "Chicken with chili sauce.", image: cheeseBurst, price: 290 },
    { id: 36, name: "Veggie Delight", description: "Mix of fresh veggies and cheese.", image: thickCrust, price: 250 },
    { id: 37, name: "Paneer Supreme", description: "Paneer cubes with onion and capsicum.", image: thinCrust, price: 260 },
    { id: 38, name: "Chicken Classic", description: "Simple chicken pizza with herbs.", image: cheeseBurst, price: 270 },
    { id: 39, name: "Herb Veggie", description: "Fresh herbs with tomato and cheese.", image: thickCrust, price: 230 },
    { id: 40, name: "Deluxe Cheese Burst", description: "Cheese burst with extra toppings.", image: cheeseBurst, price: 320 },
  ];

  const handleAddToCart = (pizza) => {
    addToCart({
      id: Date.now(),
      name: pizza.name,
      baseImage: pizza.image,
      cheese: "Regular",
      sauce: true,
      veggies: [],
      price: pizza.price,
    });

    alert(`${pizza.name} added to cart 🍕`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🍕 Our Pizza Menu</h1>

      <div style={styles.grid}>
        {menu.map((pizza) => (
          <div key={pizza.id} style={styles.card}>
            <img src={pizza.image} alt={pizza.name} style={styles.image} />
            <h3 style={styles.title}>{pizza.name}</h3>
            <p style={styles.desc}>{pizza.description}</p>
            <div style={styles.bottom}>
              <span style={styles.price}>₹{pizza.price}</span>
              <button style={styles.button} onClick={() => handleAddToCart(pizza)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "50px 30px", minHeight: "100vh", background: "linear-gradient(to right, #f8f9fa, #e9ecef)" },
  heading: { textAlign: "center", marginBottom: "40px" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" },
  card: { width: "280px", background: "#fff", borderRadius: "15px", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: "0.3s", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  image: { width: "100%", height: "180px", objectFit: "contain", marginBottom: "15px" },
  title: { marginBottom: "8px" },
  desc: { fontSize: "14px", color: "#666", marginBottom: "15px" },
  bottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  price: { fontWeight: "bold", color: "#ff4d4f", fontSize: "18px" },
  button: { padding: "8px 14px", background: "#ff4d4f", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
};

export default PizzaMenu;