const express = require('express') //require express
const app = express() //store express fn in app variable[instance of express]
const db = require('./db');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //it takes all json format data and store in req.body

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.post('/person', async(req, res) => {
    try{
        const data = req.body; //Assuming the request body contains the person data

        //Create a Person document using the Moongoose model
        // const newPerson = new Person();
        // newPerson.name = data.name;
        // newPerson.age = data.age;
        // newPerson.mobile = data.mobile;
        // newPerson.email = data.email;
        // newPerson.address = data.address;
        //OR
        
        const newPerson = new Person(data);

        // //Save the newPerson into database
        // newPerson.save((error, savedPerson) => { //callback no longer supported
        //     if(error){
        //         console.log('Error on saving person data', error);
        //         res.status[500].json({error: 'Internal server error'});

        //     }else{
        //         console.log('Data saved successfully');
        //         res.status[200].json({savedPerson})
        //     }
        // })

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
app.get('/person', async(req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

app.post('/menu-item', async(req, res) => {
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const savedMenuItem = await newMenuItem.save();
        console.log('Data saved');
        res.status(200).json(savedMenuItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})


app.get('/person/:workType', async(req, res) => {
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

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})