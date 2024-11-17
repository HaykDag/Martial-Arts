const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type:String,
        enum:['class'],
        required:true
    },
    host: {
        type: String,
        required: true
    },
    participants:{
        type: [String],
        required: true
    },
    attendees:{
      type: [String],
      required: true
    },
    start: {
        //type: Date, change back to Date when make the frontend
        type:String,
        required: true
    },
    end:{
        //type: Date, change back to Date when make the frontend
        //required: function(){this.start<this.end}
        type: String,
        required: true
    },
    photo:String
},{ timestamps: true });


module.exports = mongoose.model("Event",eventSchema);