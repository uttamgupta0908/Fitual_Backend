// const express = require('express');
// const router = express.Router();
// const { getAIGuidance } = require('../controllers/aiController');

// router.post('/', getAIGuidance);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getGeminiAIResponse } = require("../controllers/aiController");

router.post("/", getGeminiAIResponse);

module.exports = router;
