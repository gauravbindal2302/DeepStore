import { Header1 } from "../Admin";
import { useEffect } from "react";
import "./PlacedOrders.css";
export default function PlacedOrders({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
      <Header1 />
      <div className="orders-ordered">
        <div className="orders-ordered-row">
          <div>
            <h1>Orders List</h1>
            <table>
              <tr>
                <th>Order Id</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Gaurav Bindal</td>
                <td>564415168</td>
                <td>Meerut</td>
                <td>1450</td>
              </tr>
            </table>
          </div>
          <div>
            <h1>Orders Placed</h1>
            <table>
              <tr>
                <th>Order Id</th>
                <th>Placed Status</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <button>Yes</button>
                  <button>No</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
