const express = require('express');

const { Booking, User, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

module.exports = router;
