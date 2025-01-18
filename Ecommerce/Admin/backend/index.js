const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const adminLogin = require("./routes/adminRoutes/loginRoute");
const sellerAuth = require("./routes/sellerRoutes/authRoutes");
const approveSeller = require("./routes/adminRoutes/approveSeller");
const Products = require("./routes/sellerRoutes/productCRUD");
const path = require('path');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/admin",adminLogin);
app.use("/seller",sellerAuth);
app.use("/seller",Products);
app.use("/admin",approveSeller);


const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
    console.log(`server is running at port ${PORT}`);
})