const express = require("express");
const router = express.Router();
const { submitWellnessForm } = require("../controllers/wellnessController");

router.post("/", submitWellnessForm);

module.exports = router;
