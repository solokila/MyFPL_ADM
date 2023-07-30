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

// thêm branch
// https://myfpl-service.onrender.com/branch/add
router.post('/add', async (req, res, next) => {
    try {
        const { name, backGround } = req.body;
        const newBranch = new modelBranch({
            name,
            backGround,
        });
        const result = await newBranch.save();
        res.json({
            status: 200,
            message: 'Add branch successfully',
            data: result,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// cập nhật branch
// https://myfpl-service.onrender.com/branch/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, backGround } = req.body;
        const branch = modelBranch.findById(id);
        if (branch) {
            branch.name = name ? name : branch.name;
            branch.backGround = backGround ? backGround : branch.backGround;
            const result = await branch.save();
            res.json({
                status: 200,
                message: 'Update branch successfully',
                data: result,
            });
        } else {
            throw new Error('Branch not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// xóa branch
// https://myfpl-service.onrender.com/branch/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await modelBranch.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Delete branch successfully',
            });
        } else {
            throw new Error('Branch not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});



module.exports = router;