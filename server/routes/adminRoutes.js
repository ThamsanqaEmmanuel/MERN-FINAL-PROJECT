const express = require('express');
const router = express.Router();
const { getAllApplications } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/applications', auth, admin, getAllApplications);

module.exports = router;
