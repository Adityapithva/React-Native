const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config(); // Load environment variables at the very beginning

const connectDB = async () => {
    try {
        // Connect to MongoDB
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);

        // Admin credentials to be added to the database
        const email = "adityapithva36@gmail.com";
        const password = "aditya";

        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        // Hash the password and create a new admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ email, password: hashedPassword });
        await admin.save();

        console.log("Admin created successfully:", admin);
    } catch (err) {

    }
};

module.exports = connectDB;
