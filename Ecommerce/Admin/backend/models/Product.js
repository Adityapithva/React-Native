const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    seller:{type:mongoose.Schema.Types.ObjectId,ref:"Seller"},
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category: { type: String, required: true },
    image: String,
    stock: { type: Number, default: 0 }
});

module.exports = mongoose.model("Product",productSchema);