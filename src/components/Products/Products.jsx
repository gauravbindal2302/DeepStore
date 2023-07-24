import React, { useState, useEffect } from "react";
import "./Products.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products({ title }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );

    if (selectedProduct) {
      const updatedCartItems = [...cartItems, selectedProduct];
      setCartItems(updatedCartItems);
      // Navigate to the cart page with cartItems as a query parameter
      window.location.href = `/cart?items=${encodeURIComponent(
        JSON.stringify(updatedCartItems)
      )}`;
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Navbar />
      <div className="products">
        <div className="list">
          <h1>All Categories</h1>
          <ul>
            {categories.map((category) => (
              <li key={category.category}>
                <button
                  className={`list-btn ${
                    selectedCategory === category.category ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(category.category)}
                >
                  {category.category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="small-container">
          <div className="row row-2">
            <h2>All Products</h2>
          </div>
          <div className="products-list">
            {filteredProducts.map((product) => (
              <div className="product" key={product._id}>
                <Link to={"/details/" + product._id}>
                  <img
                    alt={product.productName + " image"}
                    src={product.image}
                  />
                  <h4>{product.productName}</h4>
                </Link>
                <p>₹{product.productPrice}</p>
                <h6>₹{product.productMrp}</h6>
                <br />
                <Link to={"/details/" + product._id}>
                  <button className="BuyNow-Btn">View Product</button>
                </Link>
                <Link
                  to={{
                    pathname: "/cart",
                    search: `?items=${encodeURIComponent(
                      JSON.stringify(cartItems)
                    )}`,
                  }}
                >
                  <button
                    className="AddToCart-Btn"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add To Cart
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
