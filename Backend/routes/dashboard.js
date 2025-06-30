const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserDashboard } = require('../controllers/dashboardController');

router.get('/', authMiddleware, getUserDashboard);

module.exports = router;
