var express = require('express');
var router = express.Router();
var modelExam = require('../models/examSchedule');

//get all exams
//https://myfpl-service.onrender.com/exam/
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
//https://myfpl-service.onrender.com/exam/id?idStudent=64c1f3a8fc13ae547c5da73a
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

// add exam
//https://myfpl-service.onrender.com/exam/add
router.post('/add', async (req, res, next) => {
    try {
        const { student_id, subject_id, date, time, room } = req.body;
        const newExam = new modelExam({
            student_id,
            subject_id,
            date,
            time,
            room,
        });
        const result = await newExam.save();
        res.json({
            status: 200,
            message: 'Add exam successfully',
            data: result,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//update exam
//https://myfpl-service.onrender.com/exam/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { student_id, subject_id, date, time, room } = req.body;
        const exam = await modelExam.findById(id);
        if (exam) {
            exam.student_id = student_id ? student_id : exam.student_id;
            exam.subject_id = subject_id ? subject_id : exam.subject_id;
            exam.date = date ? date : exam.date;
            exam.time = time ? time : exam.time;
            exam.room = room ? room : exam.room;
            const result = await exam.save();
            res.json({
                status: 200,
                message: 'Update exam successfully',
                data: result,
            });
        } else {
            throw new Error('Exam not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//delete exam
//https://myfpl-service.onrender.com/exam/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await modelExam.findByIdAndDelete(id);
        if(result){
            res.json({
                status: 200,
                message: 'Delete exam successfully',
                data: result,
            });
        }else{
            throw new Error('Exam not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});






module.exports = router;