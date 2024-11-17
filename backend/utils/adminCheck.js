const User = require("../models/userModel");
const createError = require("./error");

const adminCheck = async (req,res,next)=>{
    const email = req.email;
    try{
        const user = await User.findOne({email});
        
        if(!user || user.role!=='admin') {
             return next(createError(401,'You are not authorised'));
        }
        next();
    }catch(err){
        return createError(err.status,err.message);
    }
    
}

module.exports = adminCheck;