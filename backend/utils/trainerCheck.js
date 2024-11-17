const User = require("../models/userModel");
const createError = require("./error");

const trainerCheck = async (req,res,next)=>{
    const email = req.email;
    try{
        const user = await User.findOne({email});
        
        if(!user || user.role==='student') {
             return next(createError(401,'You are not authorised'));
        }
        next();
    }catch(err){
        return createError(err.status,err.message);
    }
}

module.exports = trainerCheck;