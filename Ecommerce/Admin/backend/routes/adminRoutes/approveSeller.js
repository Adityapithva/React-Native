const express = require("express");
const router = express.Router();
const Seller = require("../../models/Seller");


router.put("/approve/:sellerId",async(req,res) => {
    const {sellerId} = req.params;
    try{
        const seller = await Seller.findById(sellerId);
        if(!seller) return res.status(404).json({msg:"seller not found"});
        seller.isApproved = true;
        await seller.save();
        res.json({msg:"seller approved successful"});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
