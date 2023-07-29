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



module.exports = router;