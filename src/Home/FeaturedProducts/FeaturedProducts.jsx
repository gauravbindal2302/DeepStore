import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
    custom: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
  };

  return (
    <div className="small-container" id="featuredProducts">
      {categories.map((category) => (
        <div className="category-container" key={category._id}>
          <h2 className="title">{category.category}</h2>
          <Carousel
            responsive={responsive}
            arrows={true}
            infinite={true}
            renderButtonGroupOutside={true}
            className="carousel-box"
          >
            {products
              .filter((product) => product.category === category.category)
              .map((product) => (
                <div className="col-4" key={product._id}>
                  <Link to={"/details/" + product._id}>
                    <img
                      alt={product.productName + " image"}
                      src={product.image}
                    />
                  </Link>
                  <h4>{product.productName}</h4>
                  <p>₹{product.productPrice}.00</p>
                  <h6>₹{product.productMrp}.00</h6>
                  <br />
                  <Link to={"/details/" + product._id}>
                    <button className="BuyNow-Btn">View Product</button>
                  </Link>
                  <Link to="/cart">
                    <button className="AddToCart-Btn">Add To Cart</button>
                  </Link>
                </div>
              ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
}
