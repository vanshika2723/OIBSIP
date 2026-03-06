import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PizzaBuilder from "./pages/PizzaBuilder";
import Payment from "./pages/payment";
import VerifyEmail from "./pages/VerifyEmail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./components/Orders";
import PizzaMenu from "./components/PizzaMenu";
import { CartProvider } from "./components/CartContext";
import { PaymentProvider } from "./components/PaymentContext"; // ✅ import PaymentProvider
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import OrderTracking from "./pages/OrderTracking";
import Users from "./pages/Users";
import AdminDashboard from "./pages/AdminDashboard";

function Layout({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  const role = localStorage.getItem("role"); // admin or user

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route
          path="/admin"
          element={isLoggedIn && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/users"
          element={isLoggedIn && role === "admin" ? <Users /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard role={role} /> : <Navigate to="/login" />}
        />

        <Route
          path="/menu"
          element={isLoggedIn ? <PizzaMenu /> : <Navigate to="/login" />}
        />

        <Route
          path="/builder"
          element={isLoggedIn ? <PizzaBuilder /> : <Navigate to="/login" />}
        />

        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />

        <Route
          path="/payment"
          element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
        />

        <Route
          path="/order-tracking"
          element={isLoggedIn ? <OrderTracking /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/inventory"
          element={isLoggedIn && role === "admin" ? <Inventory /> : <Navigate to="/login" />}
        />

        <Route
          path="/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <CartProvider>
      <PaymentProvider > {/* ✅ Wrap app with PaymentProvider */}
        <Router>
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Router>
      </PaymentProvider>
    </CartProvider>
  );
}

export default App;