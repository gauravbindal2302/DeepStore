import React, { useState, useEffect } from "react";
import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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

  const [totalPrice, setTotalPrice] = useState(0);

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

  return (
    <>
      <Navbar />
      <div className="small-container cart-page">
        <table>
          <thead>
            <tr>
              <th>Cart Items</th>
              <th>Quantity</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="cart-info">
                    <img alt="" src={"Images/buy-" + item.id + ".jpg"} />
                    <div>
                      <p>{item.name}</p>
                      <small>Price: ₹{item.price.toFixed(2)}</small>
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
                  <input
                    type="number"
                    value={item.quantity}
                    className="cart-quantity"
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
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
      </div>
      <Footer />
    </>
  );
}
