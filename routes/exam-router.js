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





module.exports = router;