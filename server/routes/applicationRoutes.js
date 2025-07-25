const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  createApplication,
  getUserApplication,
  getAllApplications,
  getApplicationByUserId,
  updateApplicationByUserId,
  deleteApplicationByUserId,
} = require("../controllers/applicationController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// User routes
router.post("/", auth, upload.single("file"), createApplication); // ✅ only this POST route
router.get("/", auth, getUserApplication);

// Admin-only routes
router.get("/all", auth, admin, getAllApplications);
router.get("/admin/:userId", auth, admin, getApplicationByUserId);
router.put("/admin/:userId", auth, admin, updateApplicationByUserId);
router.delete("/admin/:userId", auth, admin, deleteApplicationByUserId);

module.exports = router;
