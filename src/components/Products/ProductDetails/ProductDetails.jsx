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
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [packsText, setPacksText] = useState("");

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

  useEffect(() => {
    if (selectedOption && quantity > 0) {
      const costPerKg = product.productPrice / 1000;
      const weightInKg = selectedOption / 1000;
      const totalCost = costPerKg * quantity * weightInKg * 1000;

      if (quantity === 1) {
        const displayOption =
          selectedOption >= 1000
            ? `${selectedOption / 1000} kg`
            : `${selectedOption} gm`;
        setPacksText(`1 pack of ${displayOption} = ₹${totalCost.toFixed(2)}`);
      } else if (quantity > 1) {
        const displayOption =
          selectedOption >= 1000
            ? `${selectedOption / 1000} kg`
            : `${selectedOption} gm`;
        setPacksText(
          `${quantity} packs of ${displayOption} = ₹${totalCost.toFixed(2)}`
        );
      } else {
        setPacksText("");
      }
    }
  }, [quantity, selectedOption, product]);

  const handleOptionChange = (e) => {
    const newSelectedOption = e.target.value;

    if (newSelectedOption === "Select quantity") {
      setSelectedOption("");
      setQuantity(0);
    } else {
      setSelectedOption(newSelectedOption);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

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
                <Link to="/">Home</Link> / {categoryName}
              </p>
              <h1 className="h1">{product.productName}</h1>
              <h4 className="h4">₹{product.productPrice}.00</h4>
              <h6 className="h6">₹{product.productMrp}.00</h6>
              <br />
              <div className="quantity">
                <select
                  name=""
                  onChange={handleOptionChange}
                  value={selectedOption}
                >
                  <option>Select quantity</option>
                  <option value="250">250gm</option>
                  <option value="500">500gm</option>
                  <option value="1000">1Kg</option>
                  <option value="5000">5Kg</option>
                  <option value="10000">10Kg</option>
                </select>
                {selectedOption && (
                  <>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                    <p>{packsText}</p>
                  </>
                )}
              </div>

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
