const Application = require('../models/Application');
const User = require('../models/User');

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user', 'name surname email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};
