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
  const [selectedSortingOption, setSelectedSortingOption] = useState("");

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

  const sortedProducts = [...filteredProducts]; // Create a copy to avoid mutating the original array

  if (selectedSortingOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
  } else if (selectedSortingOption === "highToLow") {
    sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
  }

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
            <h2>
              <select
                name=""
                id=""
                value={selectedSortingOption}
                onChange={(e) => setSelectedSortingOption(e.target.value)}
              >
                <option value="">Sort Products</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </h2>
          </div>
          <div className="products-list">
            {sortedProducts.map((product) => (
              <div className="product" key={product._id}>
                <Link to={"/details/" + product._id}>
                  <img
                    alt={product.productName + " image"}
                    src={product.image}
                  />
                  <h4>{product.productName}</h4>
                </Link>
                <p>₹{product.productPrice}.00</p>
                {product.productSize === "Customizable" ? (
                  <h6 className="h6">
                    ₹{product.productMrp}.00/
                    <span style={{ fontSize: "13px" }}>Kg</span>
                  </h6>
                ) : (
                  <h6 className="h6">
                    ₹{product.productMrp}.00/
                    <span style={{ fontSize: "13px" }}>unit</span>
                  </h6>
                )}
                <h5 className="h5">
                  {Math.round(
                    ((product.productMrp - product.productPrice) /
                      product.productMrp) *
                      100
                  )}
                  % OFF
                </h5>
                <br />
                <Link to={"/details/" + product._id}>
                  <button className="BuyNow-Btn">View Product</button>
                </Link>
                {product.productSize === "Customizable" ? (
                  <Link
                    to={`/cart?productId=${product._id}&quantity=1&weight=1000`}
                  >
                    <button className="AddToCart-Btn">Add To Cart</button>
                  </Link>
                ) : (
                  <Link to={`/cart?productId=${product._id}&quantity=1`}>
                    <button className="AddToCart-Btn">Add To Cart</button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
