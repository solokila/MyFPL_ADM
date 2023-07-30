var express = require('express');
var router = express.Router();

// nhung model vao day
var modelStudent = require('../models/student');

// nhúng thư viện bcryptjs
var bcrypt = require('bcryptjs');

/* GET users listing. */
// https://myfpl-service.onrender.com/users/
router.get('/', async (req, res, next) => {
  const data = await modelStudent.find();
  res.json(data);
});


// login
// https://myfpl-service.onrender.com/users/login
router.post('/login', async (req, res, next) => {
  const { userName, passWord } = req.body;
  const data = await modelStudent.findOne({ userName, passWord });
  if (data) {
    res.json({
      status: 200,
      message: 'Login successfully',
      data,
    });
  } else {
    res.json({
      status: 400,
      message: 'Login failed',
    });
  }
});

//register
// https://myfpl-service.onrender.com/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { userName, passWord, class: className } = req.body;

    // kiểm tra dữ liệu

    // kiểm tra tên đăng nhập có tồn tại chưa
    const checkUser = await modelStudent.findOne({ userName }); //select * from student where userName = userName
    if (checkUser) {
      throw new Error('Tên đăng nhập đã tồn tại');
    }
    
    // kiểm tra độ dài mât khẩu va tên đăng nhập
    if (userName.length < 6 || userName.length > 20) {
      throw new Error('Tên đăng nhập phải có độ dài từ 6 đến 20 ký tự');
    }

    if (passWord.length < 6 || passWord.length > 20) {
      throw new Error('Mật khẩu phải có độ dài từ 6 đến 20 ký tự');
    }

    //ma hoa password
    const salt = bcrypt.genSaltSync(10); // mã hoá 10 lần
    const hashPassWord = bcrypt.hashSync(passWord, salt); // mã hoá password

    //tao moi 1 ban ghi
    const newStudent = new modelStudent({
      userName,
      passWord: hashPassWord,
      class: className,
    });
    //luu vao db
    const data = await newStudent.save();
    res.json({
      status: 200,
      message: 'Register successfully',
      data,
    });
  } catch (error) {
    res.json({
      status: 400,
      error: error.message,
    });
  }
});

module.exports = router;
