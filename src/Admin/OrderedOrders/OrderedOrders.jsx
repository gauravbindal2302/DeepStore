import { Header1 } from "../Admin";
import { useEffect } from "react";
import "./OrderedOrders.css";

export default function OrderedOrders({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Header1 />
      <div className="orders-ordered">
        <div className="main-row">
          <div className="first-row">Order Id: 12364554</div>
          <div className="second-row">
            <div className="customer-details">
              <h1>Customer Details</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Customer Name</th>
                    <td>Shubham Papneja</td>
                  </tr>
                  <tr>
                    <th>Mobile Number</th>
                    <td>4598127865</td>
                  </tr>
                  <tr>
                    <th>House Number</th>
                    <td>B-74</td>
                  </tr>
                  <tr>
                    <th>Street Name</th>
                    <td>Chandni Chowk</td>
                  </tr>
                  <tr>
                    <th>Landmark</th>
                    <td>Main Bazaar</td>
                  </tr>
                  <tr>
                    <th>Pin Code</th>
                    <td>459815</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>Ghaziabad</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>Madhya Pradesh</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="order-details">
              <h1>Order Details</h1>
              <table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Size</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Product MRP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>64f9f6531dbe0770ae356e2c</td>
                    <td>Tata Tea Premium</td>
                    <td>250gm</td>
                    <td>2</td>
                    <td>50.00</td>
                    <td>60.00</td>
                  </tr>
                  <tr>
                    <td>1</td>

                    <td>64f9f6531dbe0770ae356e2c</td>
                    <td>Nawazish Basmati Rice</td>
                    <td>10Kg</td>
                    <td>1</td>
                    <td>74.00</td>
                    <td>80.00</td>
                  </tr>
                </tbody>
              </table>
              <ul className="order-summary">
                <li>Total Number of Items = 14</li>
                <li>Total Quantity = 27</li>
                <li>Total Bill Amount = 45</li>
                <li>Mode of Payment = UPI</li>
              </ul>
              <button type="submit" className="confirm-order">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
        <div className="main-row">
          <div className="first-row">Order Id: 12364554</div>
          <div className="second-row">
            <div className="customer-details">
              <h1>Customer Details</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Customer Name</th>
                    <td>Shubham Papneja</td>
                  </tr>
                  <tr>
                    <th>Mobile Number</th>
                    <td>4598127865</td>
                  </tr>
                  <tr>
                    <th>House Number</th>
                    <td>B-74</td>
                  </tr>
                  <tr>
                    <th>Street Name</th>
                    <td>Chandni Chowk</td>
                  </tr>
                  <tr>
                    <th>Landmark</th>
                    <td>Main Bazaar</td>
                  </tr>
                  <tr>
                    <th>Pin Code</th>
                    <td>459815</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>Ghaziabad</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>Madhya Pradesh</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="order-details">
              <h1>Order Details</h1>
              <table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Size</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Product MRP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>64f9f6531dbe0770ae356e2c</td>
                    <td>Tata Tea Premium</td>
                    <td>250gm</td>
                    <td>2</td>
                    <td>50.00</td>
                    <td>60.00</td>
                  </tr>
                  <tr>
                    <td>1</td>

                    <td>64f9f6531dbe0770ae356e2c</td>
                    <td>Nawazish Basmati Rice</td>
                    <td>10Kg</td>
                    <td>1</td>
                    <td>74.00</td>
                    <td>80.00</td>
                  </tr>
                </tbody>
              </table>
              <ul className="order-summary">
                <li>Total Number of Items = 14</li>
                <li>Total Quantity = 27</li>
                <li>Total Bill Amount = 45</li>
                <li>Mode of Payment = UPI</li>
              </ul>
              <button type="submit" className="confirm-order">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
