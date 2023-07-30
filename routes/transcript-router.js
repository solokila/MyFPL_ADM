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
        const query = { student_id: id};
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





module.exports = router;