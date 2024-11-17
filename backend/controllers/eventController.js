const Event = require("../models/eventModel");
const createError = require("../utils/error");

//add an event
const addEvent = async(req,res,next)=>{
  try {
      await Event.create(req.body);
      
      res.status(201).json({message:`The event has created`});
  } catch (error) {
      next(error);
  }
}

//get All events
const getAllEvents = async(req,res,next)=>{

  try {
      const events = await Event.find({});
      
      res.status(201).json(events);
  } catch (error) {
      next(error);
  }
}

//get one event with id passed through params
const getOneEvent = async(req,res,next)=>{
  const {id} = req.params;
    try {
        const event = await Event.findById(id);
        if(!event){
          next(createError(404,"There is no such a event"));
        }
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
}

//update an event with id through params
// update with what came through body
const updateEvent = async (req, res, next) => {
  const {id} = req.params;
  try {
    const event = await Event.findByIdAndUpdate(id, {...req.body});
    if(!event){
      next(createError(404,"no such event"))
    }
    res.status(201).json({message:`The event was updated`});
  } catch (error) {
    next(error);
  }
};

//delete an event with id through params
const deleteEvent = async (req,res,next)=>{
  const {id} = req.params;
  try{
    const event = await Event.findByIdAndDelete(id);
    if(!event){
      next(createError(404,"no such event"))
    }
    
    res.status(200).json({event,mess:'event deleted'});
  }catch(error){
    next(error);
  }
    
}


module.exports = { addEvent,getAllEvents, getOneEvent, updateEvent, deleteEvent };