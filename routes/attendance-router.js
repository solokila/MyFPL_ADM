var express = require('express');
var router = express.Router();
var modelAttendance = require('../models/attendance');

//get all attendances
//http://localhost:3000/attendance/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelAttendance.find();
        res.json({
            status: 200,
            message: 'Get all attendances successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//get attendance by id student
//http://localhost:3000/attendance/id?idStudent=64c1f3a8fc13ae547c5da73e
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.idStudent;
        const data = await modelAttendance.find({ student_id: id });
        res.json({
            status: 200,
            message: 'Get attendance by id successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//get attendance by term
//http://localhost:3000/attendance/term?term=summer2021
router.get('/term', async (req, res, next) => {
    try {
        const term = req.query.term;
        const data = await modelAttendance.find({ term: term });
        res.json({
            status: 200,
            message: 'Get attendance by term successfully',
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