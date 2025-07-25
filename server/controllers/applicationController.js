const Application = require("../models/Application");
const User = require("../models/User");
const path = require("path");

// CREATE application with uploaded document file
exports.createApplication = async (req, res) => {
  try {
    const { idNumber, dateApplied } = req.body;
    const file = req.file;

    if (new Date(dateApplied) > new Date()) {
      return res.status(400).json({ error: "Future dates not allowed" });
    }

    if (!file) {
      return res.status(400).json({ error: "Document file is required" });
    }

    // Get user details from DB to embed in the application
    const user = await User.findById(req.user._id).select("name surname phone address");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Construct a document URL accessible by frontend (assuming you serve uploads statically)
    const documentUrl = `/uploads/${file.filename}`;

    const app = new Application({
      user: req.user._id,
      idNumber,
      dateApplied,
      documentUrl,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      address: user.address,
    });

    await app.save();
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET single application for logged-in user
exports.getUserApplication = async (req, res) => {
  try {
    const app = await Application.findOne({ user: req.user._id });
    if (!app) return res.status(404).json({ error: "Application not found" });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all applications for admin
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get application by user ID for admin
exports.getApplicationByUserId = async (req, res) => {
  try {
    const application = await Application.findOne({ user: req.params.userId });
    if (!application) {
      return res.status(404).json({ message: "No application found for this user" });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE editable application fields for admin
exports.updateApplicationByUserId = async (req, res) => {
  try {
    const updateData = {
      idNumber: req.body.idNumber,
    };

    if (req.file) {
      updateData.documentUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.documentUrl) {
      updateData.documentUrl = req.body.documentUrl;
    }

    const updated = await Application.findOneAndUpdate(
      { user: req.params.userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete application by user ID
exports.deleteApplicationByUserId = async (req, res) => {
  try {
    const deleted = await Application.findOneAndDelete({ user: req.params.userId });
    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
