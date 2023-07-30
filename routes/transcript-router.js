var express = require('express');
var router = express.Router();
var modelTranscript = require('../models/transcript');

//get all transcripts
//https://myfpl-service.onrender.com/transcript/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelTranscript.find();
        res.json({
            status: 200,
            message: 'Get all transcripts successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//get transcript by idStudent
//https://myfpl-service.onrender.com/transcript/id?idStudent=64c1f3a8fc13ae547c5da73a
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.idStudent;
        const query = { student_id: id };
        const data = await modelTranscript.find(query);
        res.json({
            status: 200,
            message: 'Get transcript by idStudent successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// add new transcript
//https://myfpl-service.onrender.com/transcript/add
router.post('/add', async (req, res, next) => {
    try {
        const { student_id, subject_id, term, mark, status } = req.body;
        const transcript = new modelTranscript({
            student_id,
            subject_id,
            term,
            mark,
            status,
        });
        const result = await transcript.save();
        if (result) {
            res.json({
                status: 200,
                message: 'Add transcript successfully',
                data: result,
            });
        } else {
            throw new Error('Add transcript failed');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// update transcript
//https://myfpl-service.onrender.com/transcript/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { student_id, subject_id, term, mark, status } = req.body;
        const transcript = modelTranscript.findById(id);
        if (transcript) {
            transcript.student_id = student_id;
            transcript.subject_id = subject_id;
            transcript.term = term;
            transcript.mark = mark;
            transcript.status = status;
            const result = await transcript.save();
            res.json({
                status: 200,
                message: 'Update transcript successfully',
                data: result,
            });
        } else {
            throw new Error('transcript not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// delete transcript
//https://myfpl-service.onrender.com/transcript/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await modelTranscript.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Delete transcript successfully',
            });
        } else {
            throw new Error('transcript not found');
        }

    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});






module.exports = router;