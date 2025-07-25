const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    isCitizen: { type: Boolean, required: true },
    isDisabled: { type: Boolean, required: true },
    oathConfirmed: { type: Boolean, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "", },
    isAdmin: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
