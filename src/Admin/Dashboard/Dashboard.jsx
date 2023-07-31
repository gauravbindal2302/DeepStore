import { Header } from "../Admin";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Header />
      <hr />
      <div className="admin-header">
        <Link to="/admin/dashboard/add">
          <button type="submit" className="admin-button">
            Add
          </button>
        </Link>
        <Link to="/admin/dashboard/view">
          <button type="submit" className="admin-button">
            View
          </button>
        </Link>
        <Link to="/admin/dashboard/update">
          <button type="submit" className="admin-button">
            Update
          </button>
        </Link>
        <Link to="/admin/dashboard/delete">
          <button type="submit" className="admin-button">
            Delete
          </button>
        </Link>
      </div>
      <hr />
      <div className="orders-row">
        <Link to="/admin/dashboard/ordered-orders">
          <button type="submit" className="admin-button">
            Orders Ordered
          </button>
        </Link>
        <Link to="/admin/dashboard/placed-orders">
          <button type="submit" className="admin-button">
            Orders Placed
          </button>
        </Link>
      </div>
      <hr />
    </>
  );
}
