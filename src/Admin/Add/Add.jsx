import { Header1, CRUD } from "../Admin";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Add.css";

export default function Add({ title }) {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMrp, setProductMrp] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = title;
    getCategoryNames();
  }, [title]);

  const submitCategory = async (event) => {
    event.preventDefault();
    const category = { category: categoryName };
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/dashboard/add",
        category
      );
      if (response.status === 200) {
        alert("Category added successfully");
        setCategoryName("");
        getCategoryNames(); // Fetch updated category names
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
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

  const submitProduct = async (event) => {
    event.preventDefault();
    const product = {
      productName,
      productPrice,
      productMrp,
      productSize,
      productDescription,
      category: selectedCategory,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/dashboard/add-product",
        product
      );
      if (response.status === 200) {
        alert("Product added successfully");
        setSelectedCategory("");
        setProductName("");
        setProductPrice("");
        setProductMrp("");
        setProductSize("");
        setProductDescription("");
      } else {
        console.log("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Header1 />
      <CRUD />
      <div className="dashboard-row">
        <div className="dashboard-col-1">
          <h1>Add Category</h1>
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
          <form onSubmit={submitCategory} encType="multipart/form-data">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              placeholder="Select product image"
            />
            <input
              type="name"
              name="category"
              placeholder="Add Category"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
            <button type="submit" className="admin-btn">
              Add Category
            </button>
          </form>
        </div>
        <div className="dashboard-col-2">
          <h1>Add Product</h1>
          <form onSubmit={submitProduct} encType="multipart/form-data">
            <select
              id="categorySelect"
              name=""
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
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
            />
            <input
              type="name"
              name="productName"
              value={productName}
              placeholder="Product Name"
              onChange={(event) => setProductName(event.target.value)}
            />
            <input
              type="name"
              name="productPrice"
              value={productPrice}
              placeholder="Product Price"
              onChange={(event) => setProductPrice(event.target.value)}
            />
            <input
              type="name"
              name="productMrp"
              value={productMrp}
              placeholder="Product MRP"
              onChange={(event) => setProductMrp(event.target.value)}
            />
            <input
              type="name"
              name="productSize"
              value={productSize}
              placeholder="Product Size"
              onChange={(event) => setProductSize(event.target.value)}
            />
            <textarea
              placeholder="Product Description"
              name="productDescription"
              id=""
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            />
            <button type="submit" className="admin-btn">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
