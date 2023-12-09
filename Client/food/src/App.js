import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./pages/Cart";
import MyOrder from "./pages/MyOrder";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<Signup />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
