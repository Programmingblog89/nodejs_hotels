const express = require('express') //require express
const app = express() //store express fn in app variable[instance of express]
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //it takes all json format data and store in req.body

app.get('/', function (req, res) {
  res.send('Hello World');
})


//Import person router
const personRoutes = require('./routes/personRoute');
app.use('/person', personRoutes);

//Import menuRouter
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu-item', menuRoutes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})