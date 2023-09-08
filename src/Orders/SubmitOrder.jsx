import React, { useState, useEffect } from "react";
import "./SubmitOrder.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function SubmitOrder({ title }) {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState();
  const [showPaymentNote, setShowPaymentNote] = useState(false); // To show/hide the payment note

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the collected data here and proceed with the order
    console.log("Submitted Data:", {
      name,
      mobileNumber,
      houseNo,
      streetName,
      landmark,
      pinCode,
      city,
      state,
      paymentMethod,
    });
  };

  // Function to toggle the visibility of the payment note for the selected payment method
  const togglePaymentNote = (selectedPaymentMethod) => {
    setShowPaymentNote(selectedPaymentMethod);
  };

  return (
    <>
      <Navbar />
      <div className="small-container">
        <div className="order">
          <h2>Submit Your Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="address-section">
              <h3>Shipping Address</h3>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number:</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="houseNo">House No:</label>
                <input
                  type="name"
                  id="houseNo"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetName">Street Name:</label>
                <input
                  type="name"
                  id="streetName"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="landmark">Landmark:</label>
                <input
                  type="name"
                  id="landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetName">Pin Code</label>
                <input
                  type="name"
                  id="pinCode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="name"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetName">State</label>
                <input
                  type="name"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>{" "}
            </div>
            <div className="payment-section">
              <div className="payment-heading">
                <h3>Payment Method</h3>
                <h3>(Bill Amount: ₹850.00)</h3>
              </div>
              <div className="form-group-payment">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={() => {
                    setPaymentMethod("UPI");
                    togglePaymentNote("UPI");
                  }}
                />
                <label htmlFor="upi">
                  UPI (Paytm, PhonePe, Google Pay, etc.)
                </label>
              </div>
              {showPaymentNote === "UPI" && (
                <div className="UPI-section">
                  <p>[Total Amount: ₹850.00 + ₹60.00 (Delivery) = ₹910.00]</p>
                  <span>Scan the QR-Code</span>
                  <img
                    src="https://illustoon.com/photo/thum/7266.png"
                    alt="QR-Code"
                  />
                  <span>After Payment, Tap "Place Order"</span>
                  <button type="submit" className="submit-order-btn">
                    Place Order
                  </button>{" "}
                </div>
              )}
              <div className="form-group-payment">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => {
                    setPaymentMethod("COD");
                    togglePaymentNote("COD");
                  }}
                />
                <label htmlFor="cod">COD (Cash On Delivery)</label>
              </div>
              {showPaymentNote === "COD" && (
                <div className="COD-section">
                  <p>[Total Amount: ₹850.00 + ₹60.00 (Delivery)= ₹910.00]</p>
                  <button type="submit" className="submit-order-btn">
                    Place Order
                  </button>
                </div>
              )}
              <label id="COD-Note">
                [Note: Free COD only available under 10 Kilometres]
              </label>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
