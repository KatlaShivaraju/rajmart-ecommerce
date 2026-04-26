import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams(); // get id from URL
  const [product, setProduct] = useState(null);

  // 🛒 Add to cart
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // 🔄 Fetch product by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        console.log("DETAIL:", res.data);
        setProduct(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>{product.name}</h1>
      <h3>Brand: {product.brand}</h3>
      <h2>₹{product.price}</h2>

      <p>{product.description || "No description"}</p>

      <button onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetails;