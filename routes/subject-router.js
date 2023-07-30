var express = require('express');
var router = express.Router();
var modelSubject = require('../models/subject');

//get all subjects
//https://myfpl-service.onrender.com/subject/
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

//get subject by id
//https://myfpl-service.onrender.com/subject/id?id=64c1e20bfc13ae539c5da727
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.id;
        const data = await modelSubject.findById(id);
        res.json({
            status: 200,
            message: 'Get subject by id successfully',
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