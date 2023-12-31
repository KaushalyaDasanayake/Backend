const express = require("express");
const {
  getAllproducts,
  addProducts,
  getProductById,
  deleteProductById,
  favProductById
} = require("../controllers/ProductController");
const upload = require('../middleware/upload');

const router = express.Router();

router.route("/").get(getAllproducts).post(upload.array('images'),addProducts);
router.route("/:id").get(getProductById).delete(deleteProductById).post(favProductById);
module.exports = router;
