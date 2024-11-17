const express = require('express');
const verifyToken = require('../utils/verifyToken');
const adminCheck = require('../utils/adminCheck');
const trainerCheck = require('../utils/trainerCheck');
const { addEvent,getAllEvents, getOneEvent, updateEvent, deleteEvent } = require('../controllers/eventController');


const router = express.Router();

//add an event
//router.post('/', verifyToken, adminCheck, addTown);
router.post('/',verifyToken, trainerCheck, addEvent);

//get all events
router.get('/', verifyToken, trainerCheck, getAllEvents);

//get one event
router.get('/:id', verifyToken, trainerCheck, getOneEvent);

//update an Event
router.put('/update/:id', verifyToken,adminCheck, updateEvent);

//delete an Event
router.delete('/:id', verifyToken, adminCheck, deleteEvent);



module.exports = router;