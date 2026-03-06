import React, { useState, useContext } from "react";
import { CartContext } from "../components/CartContext";

import thinCrustImg from "../assets/base/thin-crust.png";
import thickCrustImg from "../assets/base/thick-crust.png";
import cheeseBurstImg from "../assets/base/cheese-burst.png";

import sauceTomatoImg from "../assets/sauce/tomato.png";
import sauceBBQImg from "../assets/sauce/barbecue.png";

import cheeseRegImg from "../assets/cheese/cheddar.png";
import cheeseMozzImg from "../assets/cheese/mozzarella.png";

import capsicumImg from "../assets/veggies/capsicum.png";
import onionImg from "../assets/veggies/onion.png";
import tomatoImg from "../assets/veggies/tomato.png";
import oliveImg from "../assets/veggies/olive.png";

function PizzaBuilder() {
  const { addToCart } = useContext(CartContext);

  const [base, setBase] = useState("Thin Crust");
  const [size, setSize] = useState("Medium");
  const [cheese, setCheese] = useState("Regular");
  const [sauce, setSauce] = useState("Tomato");
  const [veggies, setVeggies] = useState([]);

  const baseOptions = ["Thin Crust", "Thick Crust", "Cheese Burst"];
  const sizeOptions = ["Small", "Medium", "Large"];
  const cheeseOptions = ["Regular", "Extra", "Mozzarella"];
  const sauceOptions = ["Tomato", "BBQ", "Pesto"];
  const veggieOptions = ["Capsicum", "Onion", "Tomato", "Olives"];

  const handleVeggieChange = (veg) => {
    if (veggies.includes(veg)) setVeggies(veggies.filter((v) => v !== veg));
    else setVeggies([...veggies, veg]);
  };

  const sizePrice = size === "Small" ? 0 : size === "Medium" ? 50 : 100;
  const cheesePrice = cheese === "Extra" || cheese === "Mozzarella" ? 30 : 0;
  const saucePrice = sauce !== "Tomato" ? 20 : 10;
  const veggiePrice = veggies.length * 15;

  const totalPrice = 200 + sizePrice + cheesePrice + saucePrice + veggiePrice;

  const getBaseImage = () => (base === "Thin Crust" ? thinCrustImg : base === "Thick Crust" ? thickCrustImg : cheeseBurstImg);
  const getSauceImage = () => (sauce === "BBQ" ? sauceBBQImg : sauceTomatoImg);
  const getCheeseImage = () => (cheese === "Mozzarella" ? cheeseMozzImg : cheeseRegImg);
  const getVeggieImage = (veg) => ({ Capsicum: capsicumImg, Onion: onionImg, Tomato: tomatoImg, Olives: oliveImg }[veg]);

  const handleAddToCart = () => {
    addToCart({ id: Date.now(), name: `${base} - ${size}`, baseImage: getBaseImage(), sauce, cheese, veggies, price: totalPrice });
    alert("🍕 Pizza added to cart!");
  };

  return (
    <div className="builder-container">
      <div className="builder-card">
        <h1>🍕 Build Your Pizza</h1>

        {/** Options Section */}
        {[
          { label: "Base", value: base, options: baseOptions, setter: setBase },
          { label: "Size", value: size, options: sizeOptions, setter: setSize },
          { label: "Cheese", value: cheese, options: cheeseOptions, setter: setCheese },
          { label: "Sauce", value: sauce, options: sauceOptions, setter: setSauce }
        ].map(({ label, value, options, setter }) => (
          <div className="form-group" key={label}>
            <label>{label}</label>
            <div className="options">
              {options.map((opt) => (
                <span
                  key={opt}
                  className={`option-btn ${value === opt ? "selected" : ""}`}
                  onClick={() => setter(opt)}
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="form-group">
          <label>Veggies</label>
          <div className="options">
            {veggieOptions.map((veg) => (
              <span
                key={veg}
                className={`option-btn ${veggies.includes(veg) ? "selected" : ""}`}
                onClick={() => handleVeggieChange(veg)}
              >
                {veg}
              </span>
            ))}
          </div>
        </div>

        <button className="order-btn" onClick={handleAddToCart}>Add to Cart 🚀</button>
      </div>

      {/** Live Preview */}
      <div className="preview-card">
        <h2>🛒 Live Preview</h2>
        <div className="pizza-preview">
          <img src={getBaseImage()} alt="Base" />
          <img src={getSauceImage()} className="layer" alt="Sauce" />
          <img src={getCheeseImage()} className="layer" alt="Cheese" />
          {veggies.map((v) => <img key={v} src={getVeggieImage(v)} className="layer" alt={v} />)}
        </div>
        <div className="details">
          <p><b>Base:</b> {base}</p>
          <p><b>Size:</b> {size}</p>
          <p><b>Cheese:</b> {cheese}</p>
          <p><b>Sauce:</b> {sauce}</p>
          <p><b>Veggies:</b> {veggies.length ? veggies.join(", ") : "None"}</p>
        </div>
        <div className="price-box">Total: ₹{totalPrice}</div>
      </div>

      <style>{`
        .builder-container { display:flex; justify-content:center; gap:50px; padding:50px; min-height:100vh; background:linear-gradient(to right,#f5f7fa,#e0eafc); font-family:Poppins,sans-serif; }
        .builder-card, .preview-card { background:white; padding:30px; border-radius:20px; box-shadow:0 15px 35px rgba(0,0,0,0.1); transition:0.3s; }
        .builder-card:hover, .preview-card:hover { transform:scale(1.02); }
        h1,h2 { text-align:center; margin-bottom:20px; color:#333; }
        .form-group { margin-bottom:20px; }
        .options { display:flex; flex-wrap:wrap; gap:10px; margin-top:5px; }
        .option-btn { padding:8px 15px; border-radius:8px; border:1px solid #ccc; cursor:pointer; transition:0.3s; background:#f9f9f9; }
        .option-btn.selected { background:#ff4d4f; color:white; border:none; box-shadow:0 5px 15px rgba(255,77,79,0.3); }
        .order-btn { width:100%; padding:12px; background:#ff4d4f; color:white; border:none; border-radius:10px; font-size:16px; cursor:pointer; margin-top:15px; transition:0.3s; }
        .order-btn:hover { background:#e03e3e; transform:scale(1.02); }
        .pizza-preview { position:relative; width:220px; height:220px; margin:0 auto; }
        .pizza-preview img { width:100%; height:100%; object-fit:contain; }
        .layer { position:absolute; top:0; left:0; transition:0.3s all; }
        .details p { margin:5px 0; font-size:14px; color:#555; }
        .price-box { margin-top:15px; font-size:18px; font-weight:bold; text-align:center; color:#ff4d4f; }
      `}</style>
    </div>
  );
}

export default PizzaBuilder;