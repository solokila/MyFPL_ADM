var express = require('express');
var router = express.Router();
var modelSchedule = require('../models/schedule');

//get all schedules
//https://myfpl-service.onrender.com/schedule/
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

//get schedule by idStudent and sort by date and shift
//https://myfpl-service.onrender.com/schedule/id?idStudent=64c1f3a8fc13ae547c5da73a
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.idStudent;
        const query = { student_id: id};
        const data = await modelSchedule
        .find(query)
        .sort({date: 1, shift: 1});
        res.json({
            status: 200,
            message: 'Get schedule by idStudent successfully',
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