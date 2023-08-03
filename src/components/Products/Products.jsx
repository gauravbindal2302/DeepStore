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
      const productsWithImageUrl = response.data.map((product) => ({
        ...product,
        image: "http://localhost:5000/uploads/" + product.productImage,
      }));
      setProducts(productsWithImageUrl);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
                <p>₹{product.productPrice}.00</p>
                <h6>₹{product.productMrp}.00</h6>
                <br />
                <Link to={"/details/" + product._id}>
                  <button className="BuyNow-Btn">View Product</button>
                </Link>
                <Link to={"/cart?items=" + product._id}>
                  <button className="AddToCart-Btn">Add To Cart</button>
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
