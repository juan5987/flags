const express = require('express');
const scoreController = require('../controllers/score');

const router = express.Router();

router.put('/updatescore', scoreController.updateScore);
router.get('/rank', scoreController.getRank);

module.exports = router;
