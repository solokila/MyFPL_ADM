var express = require('express');
var router = express.Router();
var modelAttendance = require('../models/attendance');
const e = require('express');

//get all attendances
//https://myfpl-service.onrender.com/attendance/
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
//https://myfpl-service.onrender.com/attendance/id?idStudent=64c1f3a8fc13ae547c5da73e
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
//https://myfpl-service.onrender.com/attendance/term?term=summer%202021
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

//add new attendance
//https://myfpl-service.onrender.com/attendance/add
router.post('/add', async (req, res, next) => {
    try {
        const { student_id, subject_id, count, term  } = req.body;
        const newAttendance = new modelAttendance({
            student_id,
            subject_id,
            count,
            term,
        });
        const result = await newAttendance.save();
        res.json({
            status: 200,
            message: 'Add new attendance successfully',
            result,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//update attendance
//https://myfpl-service.onrender.com/attendance/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const { student_id, subject_id, count, term } = req.body;
        const product = await modelAttendance.findById(id);
        if (product) {
            product.student_id = student_id ? student_id : product.student_id;
            product.subject_id = subject_id ? subject_id : product.subject_id;
            product.count = count ? count : product.count;
            product.term = term ? term : product.term;
            const result = await product.save();
            res.json({
                status: 200,
                message: 'Update attendance successfully',
                result,
            });
        } else {
            throw new Error('Attendance not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//delete attendance
//https://myfpl-service.onrender.com/attendance/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await modelAttendance.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Delete attendance successfully',
                result,
            });
        }else{
            throw new Error('Attendance not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});





module.exports = router;