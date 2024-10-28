require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/todo",todoRoutes);
const PORT = process.env.PORT;
app.listen(PORT,() => console.log(`server running on port ${PORT}`));
