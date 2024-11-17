const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/email');
const townRoutes = require('./routes/town');
const eventRoutes = require('./routes/event');

const path = require('path');

const cookieParser = require('cookie-parser');
const cors = require('cors');

// express app
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:false
}));

// middleWares
app.use(cookieParser());
app.use(express.json());


// routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/email',emailRoutes);
app.use('/api/town',townRoutes);
app.use('/api/event',eventRoutes);

const dir = path.resolve();

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(dir,"/frontend/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(dir,"frontend","dist","index.html"));
    })
}

//error handling
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong'
    return res.status(errorStatus).json({error:errorMessage})
});

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('listening to port ' + process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

