const express = require('express');
const verifyToken = require('../utils/verifyToken');
const adminCheck = require('../utils/adminCheck');
const {login,signup,logout,verify, changePassword, forgotPassword, resetPassword} = require("../controllers/authController");

const router = express.Router();

//verify
router.get('/verify',verifyToken, verify);

//login
router.post('/login',login);

//singup
//router.post('/signup',verifyToken,adminCheck,signup);
router.post('/signup',signup);

//logout
router.get('/logout',logout);

//change password
router.patch('/new_password',verifyToken,changePassword);

//forgot password
router.post('/forgot_password',forgotPassword);

//reset password
router.get('/reset_password/:token',resetPassword);//to send the html
router.patch('/reset_password/:token',resetPassword);//to reset the password


module.exports = router;