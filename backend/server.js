import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const server = express();

dotenv.config({ path: "../config.env" });

server.use(express.json());
server.use(cors());

const DB = process.env.DATABASE;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.KEY;

// Connect to the MongoDB database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//Admin schema and model
const adminSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});
const Admin = mongoose.model("Admin", adminSchema);

// Helper function to create a JWT token
function createToken(admin) {
  return jwt.sign({ id: admin._id, email: admin.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
}

// Registration route
server.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Email already exists, Go to Login!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();
    const token = createToken(newAdmin);
    res.json({ message: "Registration Successful!", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to register!" });
  }
});

// Login route
server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ error: "You are not registered, Register Now!" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Incorrect password, Enter correct password!" });
    }
    const token = createToken(admin);
    res.json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Password reset route
server.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reset password!" });
  }
});

//Category schema and model
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

// Listening to the server at port
server.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
