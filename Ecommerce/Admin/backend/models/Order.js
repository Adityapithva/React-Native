const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
    shippingAddress: { type: String },
});

module.exports = mongoose.model("Order",orderSchema);