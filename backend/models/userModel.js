const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['student','trainer','admin'],
        default: 'student',
        required: true
    },
    DOB:{
        type: Date,//need to make Date
    },
    phone:{
        type:String,
        required: true,
    },
    town:{
        type:String,
        lowercase: true,
    },
    photo:String,
    passwordReseToken: String,
    passwordResetTokenExpires: Date
},{ timestamps: true });

//static signup method
userSchema.statics.signup = async function ({email,password,name,lastname,DOB,phone,town,role}){

    //valid check
    if(!email || !password || !name || !lastname || !phone || !town || !role){
        throw Error('All fields must be filled');
    }

    const exist = await this.findOne({ email });

    if(exist){
        throw Error('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email,password:hash,name,lastname,DOB,phone,town,role});

    return user;
}

//static login method
userSchema.statics.login = async function (email,password){
    //valid check
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    
    const user = await this.findOne({ email });

    if(!user){
        throw Error("User doesn't exist");
    }

    const match = await bcrypt.compare(password,user.password);
    
    if(!match){
        throw Error("password is not correct");
    }
    
    return user;
}

module.exports = mongoose.model("User",userSchema);