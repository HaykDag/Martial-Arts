const Town = require("../models/townModel");


//add a town
const addTown = async(req,res,next)=>{
  try {
      const town = await Town.create({...req.body});
      
      res.status(201).json({town,message:`${town.name} town has created`});
  } catch (error) {
      next(error);
  }
}

//get All towns 
const getAllTowns = async(req,res,next)=>{

  try {
      const towns = await Town.find({});
      
      res.status(201).json(towns);
  } catch (error) {
      next(error);
  }
}

//get one town
const getOneTown = async(req,res,next)=>{
  const {id} = req.params;
    try {
        const town = await Town.findById(id);
        if(!town){
          next(createError(404,"There is no such a town"));
        }
        res.status(201).json(town);
    } catch (error) {
        next(error);
    }
}

//update a town
const updateTown = async (req, res, next) => {
  const {id} = req.params;
 
  try {
    const town = await Town.findByIdAndUpdate(id, {...req.body});
    if(!town){
      next(createError(404,"There is no such a town"));
    }
    res.status(201).json({town,message:`Town's name was changed`});
  } catch (error) {
      next(error);
  }
};


//delete a town by id
const deleteTown = async (req,res,next)=>{
    const {id}  = req.params;
 
    const town = await Town.findByIdAndDelete(id);
    
    if(!town){
        next(createError(404,"no such town"))
    }
    res.status(200).json({town,mess:'town deleted'});
}


module.exports = { addTown,getAllTowns, getOneTown, updateTown, deleteTown };