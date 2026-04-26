import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";

function App() {
  // 🛒 Global Cart State (shared with Navbar + Home)
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      
      {/* ✅ Navbar gets cart count */}
      <Navbar cartCount={cart.length} />

      {/* ✅ Routes */}
      <Routes>
        
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <Home cart={cart} setCart={setCart} />
          }
        />

        {/* ➕ Add Product Page */}
        <Route path="/add_product" element={<AddProduct />} />
        <Route
  path="/product/:id"
  element={<ProductDetails cart={cart} setCart={setCart} />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
