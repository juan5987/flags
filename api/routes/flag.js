const express = require('express');
const flagController = require('../controllers/flag');

const router = express.Router();

router.get('/get', flagController.getFlags);
router.post('/add', flagController.addFlag);

module.exports = router;
