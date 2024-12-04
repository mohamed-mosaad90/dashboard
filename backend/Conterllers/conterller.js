const Product = require("../Models/Product");
const Admin = require("../Models/AdminUser");
const Imagee = require("../Models/ImageUpload");
const fs = require("fs");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloud = require("../cloud");

const getImages = (req, res) => {
  const allImages = Imagee.find().then((images) => res.json(images));
};

const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await Imagee.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    fs.unlinkSync(image.url);

    await Imagee.findByIdAndDelete(imageId);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "User",
    });

    await newUser.save();

    // Generate JWT token

    res.status(201).json("you successed signup in server ");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role ,name:user.name}, "secretkey", {
      expiresIn: "1h",
    });
    res.header("x-auth-token", token);

    res.status(200).json({ message: token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    // Parse JSON data from the request body
    var { name, category, price, Description } = req.body;
    console.log(req);
    // Assuming you're using cloud.uploads to upload the image and get the URL
    const result = await cloud.uploads(req.files[0].path);

    const imageDetails = {
      imageName: req.files[0].originalname,
      url: result.url,
    };

    // Assuming Imagee is your model for storing image details
    const image = new Imagee(imageDetails);
    await image.save();

    // Create the product object including name, category, price, and photo URL
    const product = new Product({
      name,
      category,
      price,
      photo: result.url,
      Description,
    });
    console.log(name, category, price, Description);
    // Save the product to the database
    await product.save();

    // Remove the uploaded file from the server
    fs.unlinkSync(req.files[0].path);

    // Respond with the created product
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////////////
const getAllUsers = async (req, res) => {
  try {
    const users = await Admin.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const makeAdmin = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = "Admin";
    await user.save();

    res.json({ message: "User role updated to admin successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const getUserRole = (req, res) => {
  try {
    const token = req.header('x-auth-token');

    const decodedToken = jwt.verify(token, 'secretkey');

    const userRole = decodedToken.role;

    res.status(200).json({ role: userRole });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  login,
  signup,
  getImages,
  deleteImage,
  getAllUsers,
  makeAdmin,
  deactivateUser,
  deleteUser,
  getUserRole

};
