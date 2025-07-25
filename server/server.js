const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require("./routes/userRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// All routes
app.use('/api/admin', adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/applications", adminRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Welcome to the backend! 🥳");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
