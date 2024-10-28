const express = require("express");
const Todos = require("../models/Todos");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();
const Users = require("../models/Users");
//Add a todo
router.post("/add",authenticateToken,async(req,res) => {
    const {title,description,deadline} = req.body;
    try{
        const todo = await Todos.create({title,description,deadline,isCompleted:false,user:req.user.userId});
        res.status(201).json({msg:"todo added successfull"});
    }catch(err){
        res.status(400).json({msg:"error adding todo ",err});
    }
});

//Get todos of particular user
router.get("/user",authenticateToken,async(req,res) => {
    try{
        const todos = await Todos.find({user:req.user.userId});
        res.status(200).json(todos);
    }catch(err){
        res.status(500).json({ msg: "Error retrieving todos", error: err.message });
    }
});

module.exports = router;