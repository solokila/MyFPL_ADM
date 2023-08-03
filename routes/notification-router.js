var express = require('express');
var router = express.Router();
var modelNotification = require('../models/notification');

//get all notifications
//https://myfpl-service.onrender.com/notification/
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

// add new notification
//https://myfpl-service.onrender.com/notification/add
router.post('/add', async (req, res, next) => {
    try {
        const { title, content, author, type } = req.body;

        const newNotification = new modelNotification({
            title,
            content,
            author,
            type,
        });
        const result = await newNotification.save();
        res.json({
            status: 200,
            message: 'Add notification successfully',
            data: result,
        });
    } catch (error) {
        console.log(error)
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// update notification
//https://myfpl-service.onrender.com/notification/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await modelNotification.findByIdAndUpdate(id, req.body)
        if (notification) {
            res.json({
                status: 200,
                message: 'Update notification successfully',
                data: notification,
            });
        } else {
            throw new Error('Notification not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// delete notification
//https://myfpl-service.onrender.com/notification/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await modelNotification.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Delete notification successfully',
                data: result,
            });
        } else {
            throw new Error('Notification not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});


module.exports = router;
