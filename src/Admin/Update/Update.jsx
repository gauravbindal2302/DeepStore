import { Header1, CRUD } from "../Admin";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Update.css";

export default function Update({ title }) {
  const [categories, setCategories] = useState([]); //View categories
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updatedCategoryImage, setUpdatedCategoryImage] = useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");

  useEffect(() => {
    document.title = title;
    getCategoryNames();
  }, [title]);

  const getCategoryNames = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    if (!selectedCategory || !updatedCategoryImage || !updatedCategoryName) {
      alert("Please fill in all fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("categoryImage", updatedCategoryImage);
        formData.append("categoryName", updatedCategoryName);

        await axios.put(
          `http://localhost:5000/admin/dashboard/update/${selectedCategory}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Category updated successfully");
        setSelectedCategory("");
        setUpdatedCategoryImage("");
        setUpdatedCategoryName("");
        getCategoryNames();
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  return (
    <>
      <Header1 />
      <CRUD />
      <div className="dashboard-row">
        <div className="dashboard-col-1">
          <h1>Update Category</h1>
          <table className="view-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={handleUpdateCategory} encType="multipart/form-data">
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
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              placeholder="Select product image"
              onChange={(event) =>
                setUpdatedCategoryImage(event.target.files[0])
              }
            />
            <input
              type="name"
              placeholder="Update Category"
              value={updatedCategoryName}
              onChange={(event) => setUpdatedCategoryName(event.target.value)}
            />
            <button type="submit" className="admin-btn">
              Update Category
            </button>
          </form>
        </div>
        <div className="dashboard-col-2">
          <h1>Update Product</h1>
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
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            placeholder="Select product image"
          />
          <input type="name" placeholder="Update Product Name" />
          <input type="name" placeholder="Update Product Price" />
          <input type="name" placeholder="Update Product MRP" />
          <input type="name" placeholder="Update Product Size" />
          <textarea
            placeholder="Update Product Description"
            name="message"
            id=""
          />
          <button type="submit" className="admin-btn">
            Update Product
          </button>
        </div>{" "}
      </div>
    </>
  );
}
