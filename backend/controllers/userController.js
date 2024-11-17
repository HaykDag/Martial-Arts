const User = require("../models/userModel");
const mongoose = require('mongoose')


//get All users 
const getAllUsers = async(req,res,next)=>{
    const exclude = {password:false,passwordReseToken:false,passwordResetTokenExpires:false};
    try {  
        const users = await User.find({},exclude);
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}

//get All users by a town
const getAllUsersByTown = async(req,res,next)=>{
    const town = req.params.town?.toLowerCase();
    const exclude = {password:false,passwordReseToken:false,passwordResetTokenExpires:false};
    try {  
        const users = await User.find({town},exclude);
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}

//update user
const updateUser = async (req, res, next) => {
    const email = req.email; // Maybe chage email to Id

    if(req.body.password){
        next(createError(401,"can't change the password this way"));
    }

    if(req.body.town) req.body.town = req.body.town.toLowerCase();

    try {
        await User.findOneAndUpdate({ email }, req.body);
        res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
};


//delete a user
const deleteUser = async (req,res,next)=>{
    const { id } = req.params;
 
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such user"))
    }

    const user = await User.findByIdAndDelete(id);
    
    if(!user){
        next(createError(404,"no such user"))
    }
    res.status(200).json(user);
}


module.exports = { updateUser, getAllUsers, getAllUsersByTown, deleteUser };
