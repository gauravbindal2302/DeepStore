import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/details/${id}`);
        const productWithImageUrl = {
          ...response.data,
          image: "http://localhost:5000/uploads/" + response.data.productImage,
        };
        setProduct(productWithImageUrl);
        setCategoryName(response.data.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="small-container single-product">
        {product ? (
          <div id="row">
            <div id="col-2">
              <img
                alt={product.productName}
                src={product.image}
                id="ProductImg"
              />
            </div>

            <div id="col-2">
              <p className="navigator">
                <Link to="/">Home</Link> / <Link to="#">{categoryName}</Link>
              </p>
              <h1 className="h1">{product.productName}</h1>
              <h4 className="h4">₹{product.productPrice}</h4>
              <h6 className="h6">₹{product.productMrp}</h6>
              <br />
              <select name="">
                <option>Select Size</option>
                <option>XXL</option>
                <option>XL</option>
                <option>Large</option>
                <option>Medium</option>
                <option>Small</option>
              </select>
              <input type="number" defaultValue="1" />

              <h3 className="h3">
                Product Details <i className="icon fa fa-indent"></i>
              </h3>
              <p className="description">{product.productDescription}</p>
              <Link to="/cart">
                <button type="submit" className="AddToCart">
                  Add To Cart
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}
