const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require('bcrypt');
const {sendResetEmail} = require('../controllers/emailController');
const crypto = require('crypto');
const path = require("path");
const createError = require("../utils/error");

//login user
const login = async (req, res, next) => {
    
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        generateToken(res, user.email);
        const { _id,name,lastname,DOB,phone,town,role} = user;
        res.status(201).json({ _id,name,lastname,town,role,DOB,phone});
    } catch (error) {
        next(error);
    }
};


//singup admin
const signup = async (req, res, next) => {
    
    const {email,name,lastname,DOB,phone,town,password,role } = req.body;
   
    try {
        const user = await User.signup({email,password,name,lastname,DOB,phone,town, role});
        //generateToken(res, email); no need to generate token, generate token only when loging
        res.status(201).json({ _id: user._id, email, role });
    } catch (error) {
        next(error);
    }
};

// logOut
const logout = async (req, res) => {
    await res.cookie("access_token", "", { httpOnly: true,expires: new Date(0)});
    res.status(200).json({ message: "logged out" });
};

//verify user
const verify = async (req, res, next) => {
    try {
        const {email} = req;
        const user = await User.findOne({ email });
        const {name,lastname,DOB,phone,town,role} = user;
        res.status(200).json({email,name,lastname,DOB,phone,town,role});
    } catch (err) {
        next(err);
    }
};

//update user
const changePassword = async (req, res, next) => {
    const {email} = req;
    const {password,newPassword} = req.body;
    
    try {
        const user = await User.findOne({ email });

        if(!user){
            throw Error("user not found");
        }
        
        const match = await bcrypt.compare(password,user.password);
    
        if(!match){
            throw Error("password is not correct");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword,salt);

        await User.updateOne({ email },{password:hash});

        res.status(201).json({email,message:'Password changed'});
    } catch (error) {
        next(error);
    }
};


const forgotPassword = async (req,res,next)=>{
    const {email} = req.body;

    if(!email){
        throw Error("Email wasn't provided");
    }

    try {
        //1.get the user based on email
        const user = await User.findOne({ email });
        if(!user){
            throw Error("User with this email doesn't exist");
        }

        //2.Generate random reset token
        const restetToken = crypto.randomBytes(32).toString('hex');
        const passwordReseToken = crypto.createHash('sha256').update(restetToken).digest('hex');
        const passwordResetTokenExpires = Date.now()+10*60*1000 // 10 minutes in miliseconds
        
        //3.save the token and set expire time 10 minutes
        await User.updateOne({email},{passwordReseToken,passwordResetTokenExpires});

        //4.send the resetUrl and token to the user's Email
        req.body.resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset_password/${restetToken}`
        req.body.to = email;
        req.body.subject = 'password reset token';
        
        await sendResetEmail(req,res,next);

    }catch(error){
        await User.updateOne({email},{passwordReseToken:undefined,passwordResetTokenExpires:undefined});
        next(error);
    }
}


const resetPassword = async (req,res,next)=>{
    const {password} = req.body;

    //1.get the user and check the reset token and expire date
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    try{
        const user = await User.findOne({passwordReseToken:token,passwordResetTokenExpires:{$gt:Date.now()}});

        if(!user){
            next(createError(404,"Token is invalid or expired"));
        }

        //if the req.body.password exists then change the password else send a html form for entering a new password
        if(password){
            const {email} = user;
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt);

            await User.updateOne({email},{password:hash});
            res.status(201).json({email,message:'Password changed'});
        }else{
            res.sendFile(path.join(__dirname,'../html/resetForm.html'));
        }
    }catch(error){
        next(error);
    }
}

module.exports = { login, signup, logout, verify, changePassword, forgotPassword, resetPassword  };