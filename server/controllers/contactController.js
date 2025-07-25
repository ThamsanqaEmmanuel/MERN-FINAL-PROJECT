const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  const { message, email } = req.body;

  const contact = new Contact({
    user: req.userId,
    message,
    email,
  });

  await contact.save();
  res.status(201).json({ message: "Contact submitted", contact });
};

// Get all contacts for admin
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("user", "name surname")
      .sort({ createdAt: -1 }); 

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//Delete contact by ID for admin
exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.contactId);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
