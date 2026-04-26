import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛒 Add to Cart
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  const navigate = useNavigate();

  // 🔄 Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        console.log("API DATA:", res.data);

        // ✅ safe handling
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px", background: "#f1f3f6" }}>
      <h1 style={{ textAlign: "center" }}>🛒 RAJMART</h1>

      {/* 🧾 Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
          <div
  key={product.id}
  onClick={() => navigate(`/product/${product.id}`)}
  style={{
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer"
  }}
>
              {/* Image */}
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                style={{ height: "120px", objectFit: "contain" }}
              />

              {/* Info */}
              <h4 style={{ margin: "10px 0" }}>{product.name}</h4>
              <p style={{ color: "gray" }}>by {product.brand}</p>
              <h3 style={{ color: "#b12704" }}>₹{product.price}</h3>

              {/* Button */}
              <button
  onClick={(e) => {
    e.stopPropagation();   // ✅ stops navigation
    addToCart(product);
  }}
  style={{
    background: "#ffd814",
    border: "none",
    padding: "8px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Add To Cart
</button>
            </div>
          ))
        ) : (
          <h2 style={{ textAlign: "center" }}>No products found</h2>
        )}
      </div>
    </div>
  );
};

export default Home;