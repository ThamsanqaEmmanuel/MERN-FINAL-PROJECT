// server/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { submitContact, getContacts, deleteContact } = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.post("/", auth, submitContact);
router.get("/", auth, getContacts);
router.delete("/:contactId", deleteContact);

module.exports = router;
