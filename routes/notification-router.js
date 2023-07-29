var express = require('express');
var router = express.Router();
var modelNotification = require('../models/notification');

//get all notifications
//http://localhost:3000/notification/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelNotification.find();
        res.json({
            status: 200,
            message: 'Get all notifications successfully',
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