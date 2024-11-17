const express = require('express');
const verifyToken = require('../utils/verifyToken');
const adminCheck = require('../utils/adminCheck');
const { addTown,getAllTowns, getOneTown, updateTown, deleteTown } = require('../controllers/townContoller');


const router = express.Router();

//add a town
//router.post('/', verifyToken, adminCheck, addTown);
router.post('/', addTown);

//get all towns
router.get('/', verifyToken, adminCheck, getAllTowns);

//get a town
router.get('/:id', verifyToken, adminCheck, getOneTown);

//update a town
router.put('/update/:id', verifyToken, updateTown);

//delete a town
router.delete('/:id', verifyToken, adminCheck, deleteTown);


module.exports = router;