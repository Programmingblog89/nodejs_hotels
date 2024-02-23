//install i mongoose
//import mongoose
//define the mongoDB connection URL
//Set up mongodb connection
//get default connection
//message
//exports db connection
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hoteldb';
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Get the default connection
//Mongoose maintains a default connection object representing the Mongoose Connection
const db = mongoose.connection; //establish bridge b/w mongoose and node using db variable

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.log('MongoDB Connection error', err);
});

db.on('disconnected', (err) => {
    console.log('MongoDB disconnected');
});


//export the database connection
module.exports = db;