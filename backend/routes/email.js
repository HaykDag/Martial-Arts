const express = require('express');
const {sendEmail} = require('../controllers/emailController');
const verifyToken = require('../utils/verifyToken');
const adminCheck = require('../utils/adminCheck');
const router = express.Router();

//send Email
router.post('/',verifyToken,adminCheck,sendEmail);


module.exports = router;