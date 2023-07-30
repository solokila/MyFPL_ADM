var express = require('express');
var router = express.Router();

// nhung model vao day
var modelBranch = require('../models/branch');

// lấy tất cả các branch
// https://myfpl-service.onrender.com/branch/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelBranch.find();
        res.json({
            status: 200,
            message: 'Get all branch successfully',
            data,
        });
        
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// lấy branch theo id
// https://myfpl-service.onrender.com/branch/64c1e20bfc13ae539c5da727
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await modelBranch.findById(id);
        res.json({
            status: 200,
            message: 'Get branch successfully',
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