const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();
console.log("HERE")

router.post('/signup', authController.signup);
router.post('/login', authController.login);
console.log("HERE")

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post("/validateToken", authController.protect, authController.validateCorrect )
// Protect all routes after this middleware
router.use(authController.protect);




console.log("HERE")
module.exports = router;
