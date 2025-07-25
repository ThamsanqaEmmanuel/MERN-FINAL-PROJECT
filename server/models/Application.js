const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    dateApplied: {
      type: Date,
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },

    
    name: String,
    surname: String,
    phone: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
