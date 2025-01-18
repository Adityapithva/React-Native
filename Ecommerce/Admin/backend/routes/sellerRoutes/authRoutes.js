const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Seller = require("../../models/Seller");
const jwt = require("jsonwebtoken");


//Register a new seller
router.post("/register",async(req,res) => {
    const {name,email,password} = req.body;
    try{
        const existingSeller = await Seller.findOne({email});
        if(existingSeller) return res.status(400).json({msg:"seller already exists"});
        const hashedPassword = await bcrypt.hash(password,10);
        const newSeller = new Seller({name,email,password:hashedPassword,isApproved:false});
        await newSeller.save();
        res.status(201).json({msg:"Registraction successful,waiting for admin approval"});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


//login a authorized seller
router.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try{
        const seller = await Seller.findOne({email});
        if(!seller) return res.status(404).json({msg:"seller not found"});
        if(!seller.isApproved) return res.status(403).json({msg:"seller not approved"});
        const validPassword = await bcrypt.compare(password,seller.password);
        if(!validPassword) return res.status(400).json({msg:"invalid credentials"});
        const token = jwt.sign({id:seller._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({token,seller:{id:seller._id,email:seller.email,name:seller.name},msg:"login successful"});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;