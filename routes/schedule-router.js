var express = require('express');
var router = express.Router();
var modelSchedule = require('../models/schedule');

//schedule support
var modelStudent = require('../models/student'); //for check student_id and get student_name
var modelSubject = require('../models/subject'); //for check subject_id and get subject_name

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

//get schedule by idStudent and sort by shift
//https://myfpl-service.onrender.com/schedule/id?idStudent=64c93a77ba894b2a4b3542a0
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.id;
        const query = { student_id: id};
        const data = await modelSchedule
        .find(query)
        .sort({shift: 1});
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

// add schedule
//https://myfpl-service.onrender.com/schedule/add
router.post('/add', async (req, res, next) => {
    try {
        const { 
            student_id, subject_id, description,
             teacher, className, exemption, status, 
             room, shift, date, numberOfSession 
        } = req.body;


        // make new schedule
        const newSchedule = new modelSchedule({
            student_id, subject_id, 
            description,
            teacher, class: className, exemption, status,
            room, shift, date, numberOfSession
        });
        const result = await newSchedule.save();
        res.json({
            status: 200,
            message: 'Add schedule successfully',
            data: result,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// update schedule
//https://myfpl-service.onrender.com/schedule/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const {
            student_id, subject_id, description,
                teacher, className, exemption, status,
                room, shift, date, numberOfSession
        } = req.body;
        const schedule = modelSchedule.findById(id);
        if (schedule) {
            schedule.student_id = student_id ? student_id : schedule.student_id;
            schedule.subject_id = subject_id ? subject_id : schedule.subject_id;
            schedule.description = description ? description : schedule.description;
            schedule.teacher = teacher ? teacher : schedule.teacher;
            schedule.className = className ? className : schedule.className;
            schedule.exemption = exemption ? exemption : schedule.exemption;
            schedule.status = status ? status : schedule.status;
            schedule.room = room ? room : schedule.room;
            schedule.shift = shift ? shift : schedule.shift;
            schedule.date = date ? date : schedule.date;
            schedule.numberOfSession = numberOfSession ? numberOfSession : schedule.numberOfSession;
            const result = await schedule.save();
            res.json({
                status: 200,
                message: 'Update schedule successfully',
                data: result,
            });
        }else{
            throw new Error('Schedule not found');
        }
        
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// delete schedule
//https://myfpl-service.onrender.com/schedule/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await modelSchedule.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Delete schedule successfully',
                data: result,
            });
        } else {
            throw new Error('Schedule not found');
        }
        
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});




module.exports = router;