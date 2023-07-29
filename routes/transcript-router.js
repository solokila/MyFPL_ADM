var express = require('express');
var router = express.Router();
var modelTranscript = require('../models/transcript');

//get all transcripts
//http://localhost:3000/transcript/
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





module.exports = router;