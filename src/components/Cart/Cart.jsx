import React, { useState, useEffect } from "react";
import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
//import axios from "axios";

export default function Cart({ title }) {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Red Printed T-Shirt",
      price: 50.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "Blue Printed T-Shirt",
      price: 75.0,
      quantity: 1,
    },
    {
      id: 3,
      name: "Red Printed T-Shirt",
      price: 50.0,
      quantity: 1,
    },
    {
      id: 4,
      name: "Red Printed T-Shirt",
      price: 50.0,
      quantity: 1,
    },
    {
      id: 5,
      name: "Blue Printed T-Shirt",
      price: 75.0,
      quantity: 1,
    },
    {
      id: 6,
      name: "Red Printed T-Shirt",
      price: 50.0,
      quantity: 1,
    },
  ]);

  //const { id } = useParams();
  //const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    let total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [items]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  /* useEffect(() => {
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
*/
  /*useEffect(() => {
    fetchProducts();
  }, []);

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
  };*/

  const handleInputChange = (event, itemId) => {
    let newItems = items.map((item) => {
      if (item.id === itemId) {
        // Ensure that quantity is always at least 1
        const quantity = parseInt(event.target.value);
        return { ...item, quantity: Math.max(1, quantity) };
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

  const handleRemoveItem = (itemId) => {
    let newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <>
      <Navbar />
      <div className="small-container cart-page" id="cart">
        <table>
          <thead>
            <tr>
              <th style={{ paddingLeft: "20px", borderRadius: "8px 0 0 8px" }}>
                Cart Items
              </th>
              <th>Quantity</th>
              <th style={{ paddingRight: "20px", borderRadius: "0 8px 8px 0" }}>
                SubTotal
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="cart-info">
                    <img alt="" src={`Images/buy-${item.id}.jpg`} />
                    <div>
                      <p>{item.name}</p>
                      <small style={{ fontSize: "13px", m: "-0" }}>
                        OUR PRICE: ₹{item.price.toFixed(2)}
                      </small>
                      <br />
                      <small style={{ fontSize: "12px" }}>
                        MRP: ₹{item.price.toFixed(2)}
                      </small>
                      <br />
                      <button
                        className="cart-remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cart-quantity">
                    <input
                      type="number"
                      value={item.quantity}
                      className="cart-quantity"
                      onChange={(e) => handleInputChange(e, item.id)}
                    />
                    <select
                      name="quantityOptions"
                      onChange={handleSelectChange}
                      value={selectedOption}
                    >
                      <option>Select Quantity</option>
                      <option value="250">250gm</option>
                      <option value="500">500gm</option>
                      <option value="1000">1Kg</option>
                      <option value="5000">5Kg</option>
                      <option value="10000">10Kg</option>
                    </select>
                    <br />
                    <label>
                      {item.quantity === 1
                        ? "1 piece of "
                        : item.quantity + " pieces of "}
                      {item.quantity * selectedOption}
                      {selectedOption >= 1000 ? "kg" : "gm"}
                    </label>
                  </div>
                </td>
                <td className="cart-subtotal">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="total-price">
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>₹{totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>₹35.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>₹{(totalPrice + 35.0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>

        {/*<span>Your cart is empty!</span>*/}
      </div>

      <Footer />
    </>
  );
}
