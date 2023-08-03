import { Header1, CRUD } from "../Admin";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Delete.css";

export default function Delete({ title }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = title;
    getCategoryNames();
  }, [title]);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (!selectedCategory) {
      alert("Please select a category to delete");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/admin/dashboard/delete/${selectedCategory}`
      );
      alert("Category deleted successfully");
      setSelectedCategory("");
      getCategoryNames();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const getCategoryNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <Header1 />
      <CRUD />
      <div className="dashboard-row">
        <div className="dashboard-col-1">
          <h1>Delete Category</h1>
          <table className="view-table">
            <tr>
              <th>S.No.</th>
              <th>Categories</th>
            </tr>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.category}</td>
              </tr>
            ))}
          </table>
          <form onSubmit={handleDelete}>
            <select
              name=""
              value={selectedCategory}
              onChange={handleCategorySelect}
            >
              <option>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
            <button type="submit" className="admin-btn">
              Delete Category
            </button>
          </form>
        </div>
        <div className="dashboard-col-2">
          <h1>Delete Product</h1>
          <select name="" id="view-select-1">
            <option>Select Category</option>
            {categories.map((category) => (
              <option key={category._id}>{category.category}</option>
            ))}
          </select>
          <select name="" id="view-select-2">
            <option>Select Product</option>
            {categories.map((category) => (
              <option key={category._id}>{category.category}</option>
            ))}
          </select>
          <button type="submit" className="admin-btn">
            Delete Product
          </button>
        </div>
      </div>
    </>
  );
}
