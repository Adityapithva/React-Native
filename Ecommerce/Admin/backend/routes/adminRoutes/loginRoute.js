const Admin = require("../../models/Admin");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login",async(req,res) => {
    const {email,password} = req.body;
    try{
        const admin = await Admin.findOne({email});
        if(!admin) return res.status(404).json({msg:"admin not found"});

        const validPassword = await bcrypt.compare(password,admin.password);
        if(!validPassword) return res.status(400).json({msg:"invalid credentials"});
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            msg:"login successfull"
        });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;