const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      name: "Thamsanqa Emmanuel",
      surname: "Sanhewe",
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: "0000000000",
      address: "Admin HQ",
      isAdmin: true,
    });

    await adminUser.save();
    console.log("Admin created successfully.");
    process.exit();
  } catch (err) {
    console.error(" Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
