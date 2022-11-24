const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/resetpassword', userController.resetPassword);
router.put('/resetpassword/:token', userController.updatePassword);

module.exports = router;
