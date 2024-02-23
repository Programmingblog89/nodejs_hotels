const mongoose = require('mongoose');

//Define the Person schema
const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    }
})

//Create Person model using above schema and using this model we perform db oeprations
const Person = mongoose.model('Person', personSchema);
module.exports = Person;