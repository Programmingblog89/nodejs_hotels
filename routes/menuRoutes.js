const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async(req, res) => {
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

module.exports = router;