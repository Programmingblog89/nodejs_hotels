const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async(req, res) => {
    try{
        const data = req.body; //Assuming the request body contains the person data

        //Create a Person document using the Moongoose model
    
        const newPerson = new Person(data);

        //use async await instead of callback
        const savedPerson = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(savedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

//Get method
router.get('/', async(req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})


router.get('/:workType', async(req, res) => {
    try{
        const workType = req.params.workType; //it is a params not body
        if(workType === 'chef' || workType === 'manager' || workType === 'waiter'){
            const response = await Person.find({work: workType});
            console.log('Response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Work Type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

//Upates
router.put('/:id', async(req, res) => {
    try{
        const personId = req.params.id; //Extract id from URL parameter
        const updatedPersonData = req.body; //Updated data for the Person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Returns the updated data
            runValidators: true, //Run mongoose validation
        });

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

//Delete
router.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id; //Extract the person's id from the URL Parameter

        //Assuming you have a Person Model
        const response = await Person.findByIdAndRemove(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person deleted succussfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

module.exports = router;