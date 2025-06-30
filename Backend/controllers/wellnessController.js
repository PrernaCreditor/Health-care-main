const Wellness = require("../models/Wellness");

exports.submitWellnessForm = async (req, res) => {
  try {
    const { name, email, phone, program, message, goal } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "❌ Name, Email, and Message are required." });
    }

    const wellness = new Wellness({ name, email, phone, program, message, goal });
    await wellness.save();

    res.status(201).json({ message: "✅ Wellness inquiry submitted successfully." });
  } catch (err) {
    console.error("❌ Wellness form error:", err);
    res.status(500).json({ message: "Server error. Could not submit inquiry." });
  }
};
