const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getLoggedInUser, updateUserProfile, getAllUsers, getUserById, updateUserById, deleteUserById} = require("../controllers/userController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getLoggedInUser);
router.put("/profile", auth, updateUserProfile);

//admin routes
router.get("/all", auth, admin, getAllUsers);
router.get("/admin/:userId", auth, admin, getUserById);
router.put("/admin/:userId", auth, admin, updateUserById);
router.delete("/admin/:userId", auth, admin, deleteUserById);

module.exports = router;
