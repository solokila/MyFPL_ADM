var express = require('express');
var router = express.Router();
var modelSubject = require('../models/subject');

//get all subjects
//https://myfpl-service.onrender.com/subject/
router.get('/', async (req, res, next) => {
    try {
        const data = await modelSubject.find();
        res.json({
            status: 200,
            message: 'Get all subjects successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

//get subject by id
//https://myfpl-service.onrender.com/subject/id?id=64c1e20bfc13ae539c5da727
router.get('/id', async (req, res, next) => {
    try {
        const id = req.query.id;
        const data = await modelSubject.findById(id);
        res.json({
            status: 200,
            message: 'Get subject by id successfully',
            data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// add new subject
//https://myfpl-service.onrender.com/subject/add
router.post('/add', async (req, res, next) => {
    try {
        const { name, credit, idSubject} = req.body;
        const subject = new modelSubject({
            name,
            credit,
            idSubject,
        });
        const result = await subject.save();
        if (result) {
            res.json({
                status: 200,
                message: 'Add subject successfully',
                data: result,
            });
        }else{
            throw new Error('Add subject failed');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// update subject
//https://myfpl-service.onrender.com/subject/update/:id
router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, credit, idSubject} = req.body;
        const subject = modelSubject.findById(id);
        if (subject) {
            subject.name = name ? name : result.name;
            subject.credit = credit ? credit : result.credit;
            subject.idSubject = idSubject ? idSubject : result.idSubject;
            const result = await subject.save();
            res.json({
                status: 200,
                message: 'Update subject successfully',
                data: result,
            });
        }else{
            throw new Error('subject not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});

// delete subject
//https://myfpl-service.onrender.com/subject/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await modelSubject.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                message: 'Delete subject successfully',
                data: result,
            });
        }else{
            throw new Error('subject not found');
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message,
        });
    }
});




module.exports = router;