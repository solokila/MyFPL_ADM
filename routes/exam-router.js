var express = require('express');
var router = express.Router();
var modelExam = require('../models/examSchedule');

//get all exams
//http://localhost:3000/exam/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelExam.find();
        res.json({
            status: 200,
            message: 'Get all exams successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//get exam by id student and sort by date
//http://localhost:3000/exam/id?idStudent=64c1f3a8fc13ae547c5da73a
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.idStudent;
        const query = { student_id: id};
        const data = await modelExam
        .find(query)
        .sort({date: 1});
        res.json({
            status: 200,
            message: 'Get exam by idStudent successfully',
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