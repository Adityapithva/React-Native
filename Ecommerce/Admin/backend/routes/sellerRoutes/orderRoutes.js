const express = require("express");
const router = express.Router();l
const Order = require("../../models/Order");
const authenticateSeller = require("../../middlewares/authenticateSeller");


//Get all orders of a seller
router.get("/add",authenticateSeller,async(req,res) => {
    try{
        const orders = await Order.find({seller:req.seller.id}).populate("products.product customer");
        if(!orders) return res.status(404).json({msg:"no orders yet"});
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});


//Get details of a single order
router.get("/:id",authenticateSeller,async(req,res) => {
    const {id} = req.params;
    try{
        const order = await Order.findById(id).populate("products.product customer");
        if(!order) return res.status(404).json({msg:"order not found"});
        res.json(order);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});


//Update order status
router.put("/update/:id",authenticateSeller,async(req,res) => {
    const {id} = req.params;
    const {status} = req.body;
    try{
        const order = await Order.findById(id);
        if(!order) return res.status(404).json({msg:"order not found"});
        if(status) order.status = status;
        await Order.save();
        res.status(200).json({msg:"order status updated"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});


module.exports = router;