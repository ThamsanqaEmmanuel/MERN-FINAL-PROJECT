const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
