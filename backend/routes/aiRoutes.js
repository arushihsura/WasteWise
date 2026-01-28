const express = require('express');
const { getAIResponse, getAIResponseStream } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes for AI queries
router.post('/query', protect, getAIResponse);
router.post('/query-stream', protect, getAIResponseStream);

module.exports = router;
