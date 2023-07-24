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
        <div className="orders-ordered-row">
          <div>
            <h1>Orders Ordered</h1>
            <table>
              <tr>
                <th>Order Id</th>
                <th>Item</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>MRP</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tata Tea Premium</td>
                <td>250gm</td>
                <td>2</td>
                <td>10</td>
                <td>12</td>
              </tr>
            </table>
          </div>
          <div>
            <h1>Ordered By</h1>
            <table>
              <tr>
                <th>Name</th>
                <th>Phone</th>
              </tr>
              <tr>
                <td>Gaurav Bindal</td>
                <td>595959620</td>
              </tr>
              <tr>
                <th>Address</th>
              </tr>
              <tr>
                <td>antartica ocean bdejbjedbjedb</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
