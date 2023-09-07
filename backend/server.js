import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: "../config.env" });

server.use(express.json());
server.use(cors());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the destination folder to store the images (create the 'uploads' folder in your project)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file with a timestamp to avoid name collisions
  },
});

const upload = multer({ storage: storage });

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
  image: String,
  products: [
    {
      productImage: String,
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
server.post(
  "/admin/dashboard/add",
  upload.single("image"),
  async (req, res) => {
    const { category } = req.body;
    const image = req.file.filename; // Get the filename of the uploaded image

    try {
      const newCategory = new Category({ category, image, products: [] });
      await newCategory.save();
      res.sendStatus(200);
    } catch (error) {
      console.error("Error adding category:", error);
      res.sendStatus(500);
    }
  }
);

// Reusable route handler function for fetching (view) categories
const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(
      categories.map((category) => ({
        ...category._doc,
        image: `http://localhost:5000/uploads/${category.image}`, // Send the full image URL to the client
      }))
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.sendStatus(500);
  }
};

// Route handlers for fetching categories
server.get("/categories", fetchCategories);

// Route handlers for updating categories
server.put(
  "/admin/dashboard/update/:category",
  upload.single("categoryImage"),
  async (req, res) => {
    const { category } = req.params;
    const { categoryName } = req.body;
    const categoryImage = req.file.filename;
    try {
      await Category.findOneAndUpdate(
        { category },
        { category: categoryName, image: categoryImage }
      );
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating category:", error);
      res.sendStatus(500);
    }
  }
);

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
  productImage: String,
  productName: String,
  productPrice: String,
  productMrp: String,
  productSize: String,
  productDescription: String,
  category: String,
});
const Product = mongoose.model("Product", productSchema);

server.post(
  "/admin/dashboard/add-product",
  upload.single("image"),
  async (req, res) => {
    const {
      productName,
      productPrice,
      productMrp,
      productSize,
      productDescription,
      category,
    } = req.body;

    const productImage = req.file.filename; // Get the filename of the uploaded image

    try {
      const newProduct = new Product({
        productName,
        productPrice,
        productMrp,
        productSize,
        productDescription,
        category,
        productImage, // Save the filename in the 'productImage' field of the Product model
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
  }
);

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
