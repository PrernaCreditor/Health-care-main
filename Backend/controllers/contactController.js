const Contact = require("../models/contactModel");
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, Email and Message are required." });
    }

    const contact = new Contact({ name, email, phone, program, message });
    await contact.save();

    res.status(201).json({ message: "Message submitted successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Server error. Could not send message." });
  }
};
