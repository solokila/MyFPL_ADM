var express = require('express');
var router = express.Router();

// nhung model vao day
var modelBranch = require('../models/branch');

// lấy tất cả các branch
// http://localhost:3000/branch/
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








module.exports = router;