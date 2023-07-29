var express = require('express');
var router = express.Router();
var modelSubject = require('../models/subject');

//get all subjects
//http://localhost:3000/subject/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelSubject.find();
        res.json({
            status: 200,
            message: 'Get all subjects successfully',
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