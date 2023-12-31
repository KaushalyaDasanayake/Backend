const ProductModel = require("../models/Product");

exports.getAllproducts = async () => {
  return await ProductModel.find();
};

exports.addProduct = async (data) => {
  try {
    if (data._id) {
      // With id - edit
      const existingProduct = await ProductModel.findById(data._id);
      if (!existingProduct) {
        throw new Error("Product not found");
      }

      // Keep old image URLs
      const oldImageUrls = existingProduct.imageUrl || [];

      // Update product properties
      Object.assign(existingProduct, data);

      var newImageUrls;
      if (data.imageUrl) {
        newImageUrls = data.imageUrl.map((image) => ({ path: `${image.path}` }));
        existingProduct.imageUrl = [...oldImageUrls, ...newImageUrls];
      }

      const updatedProduct = await existingProduct.save();
      return { newimage: newImageUrls, old:existingProduct.imageUrl,  status: "Update successful" };
    } else {
      // without id - add
      const newProduct = new ProductModel(data);

      if (data.images) {
        const imageUrls = data.images.map(
          (image) => `assets/images/${image.filename}`
        );
        newProduct.imageUrl = imageUrls;
      }

      const savedProduct = await newProduct.save();
      return { data: savedProduct, status: "Create successful" };
    }
  } catch (error) {
    throw new Error(`Failed to handle product: ${error.message}`);
  }
};

exports.getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

exports.deleteProductById = async (productId) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new Error("Product not found");
  }

  return { data: deletedProduct, status: "Delete successful" };
};

exports.favProductById = async (productId) => {
  const favProduct = await ProductModel.findById(productId);
  favProduct.isFavorite = !favProduct.isFavorite;
  await favProduct.save();
  return { data: favProduct, status: "Update successful" };
};
