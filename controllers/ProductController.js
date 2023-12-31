const productService = require("../services/ProductService.js");

//Get All products
exports.getAllproducts = async (req, res) => {
  try {
    const products = await productService.getAllproducts();
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add or update a product
exports.addProducts = async (req, res) => {
  try {
    const data = req.body;

    // Handle file uploads with multer
    const files = req.files;

    if (files && files.length > 0) {
      data.imageUrl = files.map(file => ({
          path: file.path,
      }));
  }
    
    const result = await productService.addProduct(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product ? { data: product, status: "success" } : { error: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productService.deleteProductById(productId);
  
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Favourite a product by ID
exports.favProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productService.favProductById(productId);
  
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
