const mongoose = require("mongoose");


const customerSchema = mongoose.Schema({
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String },
    address: { type: String },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});


module.exports = mongoose.model("Customer",customerSchema);