const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const townSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        lowercase: true,
    },
    photo:String
},{ timestamps: true });



module.exports = mongoose.model("Town",townSchema);