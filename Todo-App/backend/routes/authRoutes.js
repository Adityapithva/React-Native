const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const router = express.Router();

//Register
router.post("/register",async(req,res) => {
    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const user = await User.create({username:username,email:email,password:hashedPassword});
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({error:"Error creating user"});
    }
});

//Login
router.post("/login",async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:"Invalid credentials"});
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) return res.status(400).json({error:"Invalid credentials"});
    res.status(200).json({msg:"login successfull"});
});

module.exports = router;