const express = require('express');
const verifyToken = require('../utils/verifyToken');
const adminCheck = require('../utils/adminCheck');
const { updateUser,getAllUsers,getAllUsersByTown,deleteUser} = require("../controllers/userController");


const router = express.Router();

//get all users
router.get('/', verifyToken, adminCheck, getAllUsers);

//get all users by town
router.get('/:town', verifyToken, adminCheck, getAllUsersByTown);

//update
router.put('/update', verifyToken, updateUser);

//delete user
router.delete('/:id', verifyToken, adminCheck, deleteUser);



module.exports = router;