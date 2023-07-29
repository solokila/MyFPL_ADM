var express = require('express');
var router = express.Router();
var modelSchedule = require('../models/schedule');

//get all schedules
//http://localhost:3000/schedule/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelSchedule.find();
        res.json({
            status: 200,
            message: 'Get all schedules successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});




module.exports = router;