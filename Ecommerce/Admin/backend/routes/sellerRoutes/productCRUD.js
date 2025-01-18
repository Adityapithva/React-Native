const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const authenticateSeller = require("../../middlewares/authenticateSeller");
const upload = require("../../configs/multerConfig");


//Add a new product
router.post("/add", authenticateSeller, upload.single("image"), async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? req.file.path : "";
    const sellerId = req.seller.id;
    try {
        const newProduct = new Product({ seller: sellerId, name, description, price, category, stock, image });
        await newProduct.save();
        res.status(201).json({ msg: 'Product added successfully', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Delete a existing product
router.delete("/delete/:id", authenticateSeller, async(req, res) => {
    const  productId  = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: "product not found" });
        await Product.findByIdAndDelete(productId);
        res.json({msg:"product deleted successful"});
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;