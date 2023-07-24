import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const server = express();

// Using Middlewares
server.use(cors());
server.use(bodyParser.json());
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
const PORT = process.env.PORT;

// Connect to the MongoDB database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected to DeepStoreDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Create a schema for categories
const categorySchema = new mongoose.Schema({
  category: String,
  products: [
    {
      productName: String,
      productPrice: String,
      productMrp: String,
      productSize: String,
      productDescription: String,
    },
  ],
});
const Category = mongoose.model("Category", categorySchema);

// Route handler for adding a new category
server.post("/admin/dashboard/add", async (req, res) => {
  const { category, products } = req.body;
  try {
    const newCategory = new Category({ category, products });
    await newCategory.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding category:", error);
    res.sendStatus(500);
  }
});

// Reusable route handler function for fetching (view) categories
const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.sendStatus(500);
  }
};

// Route handlers for fetching categories
server.get("/categories", fetchCategories);

// Route handlers for updating categories
server.put("/admin/dashboard/update/:category", async (req, res) => {
  const { category } = req.params;
  const { updatedCategoryName } = req.body;
  try {
    await Category.findOneAndUpdate(
      { category },
      { category: updatedCategoryName }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating category:", error);
    res.sendStatus(500);
  }
});

// Route handlers for deleting categories
server.delete("/admin/dashboard/delete/:category", async (req, res) => {
  const { category } = req.params;
  try {
    await Category.deleteOne({ category });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.sendStatus(500);
  }
});

// Create a schema for products
const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
  productMrp: String,
  productSize: String,
  productDescription: String,
  category: String,
});
const Product = mongoose.model("Product", productSchema);

// Route handler for adding a new product
server.post("/admin/dashboard/add-product", async (req, res) => {
  const {
    productName,
    productPrice,
    productMrp,
    productSize,
    productDescription,
    category,
  } = req.body;
  try {
    const newProduct = new Product({
      productName,
      productPrice,
      productMrp,
      productSize,
      productDescription,
      category,
    });
    await newProduct.save();

    // Update the products array in the corresponding category
    await Category.findOneAndUpdate(
      { category },
      { $push: { products: newProduct } }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding product:", error);
    res.sendStatus(500);
  }
});
server.put("/admin/dashboard/update-product/:category/:product", (req, res) => {
  const category = req.params.category;
  const product = req.params.product;
  const updatedProduct = req.body;

  // Find the category in the data
  const foundCategory = categories.find((c) => c.category === category);

  if (foundCategory) {
    // Find the product in the category
    const foundProduct = foundCategory.products.find(
      (p) => p.productName === product
    );

    if (foundProduct) {
      // Update the product information
      foundProduct.productName = updatedProduct.productName;
      foundProduct.productPrice = updatedProduct.productPrice;
      foundProduct.productMrp = updatedProduct.productMrp;
      foundProduct.productSize = updatedProduct.productSize;
      foundProduct.productDescription = updatedProduct.productDescription;

      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});
// Route handler for fetching products
server.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.sendStatus(500);
  }
});

server.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product with the given ID in the database
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a schema for the contact form
const contactSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  phone: String,
  message: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// Route handler for submitting the contact details
server.post("/contact", async (req, res) => {
  const { fName, lName, email, phone, message } = req.body;
  try {
    const newContact = new Contact({
      fName,
      lName,
      email,
      phone,
      message,
    });
    await newContact.save();
    res.send({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.sendStatus(500);
  }
});

// Create a schema for the login form
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({ username: username })
    .then((admin) => {
      if (admin) {
        if (password === admin.password) {
          res.send({ message: "Login Successful", admin: admin });
        } else {
          res.send({ message: "Password didn't match" });
        }
      } else {
        res.send({ message: "Admin not Registered" });
      }
    })
    .catch((err) => {
      console.error("Error occurred while searching for admin:", err);
      res.sendStatus(500);
    });
});

// Create a schema for the register form
const users = [];

server.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Check if the username or email is already registered
  if (
    users.some((user) => user.username === username || user.email === email)
  ) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  // Create a new user object
  const newUser = { username, email, password };

  // Save the new user
  users.push(newUser);

  return res.status(200).json({ message: "You are registered successfully!" });
});

// Listening to the server at port
server.listen(PORT, () => {
  console.log(`Your server of Deep Store is running on port ${PORT}`);
});
