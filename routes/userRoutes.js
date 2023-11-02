const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post("/validateToken", authController.protect, authController.validateCorrect )
// Protect all routes after this middleware
router.use(authController.protect);




module.exports = router;
