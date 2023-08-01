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
  try {
    const { userName, passWord } = req.body;
    const student = await modelStudent.findOne({ userName: userName });
    if (!student) {
      throw new Error('Tên đăng nhập không tồn tại');
    }

    // kiểm tra mật khẩu
    const checkPass = bcrypt.compareSync(passWord, student.passWord);
    if (!checkPass) {
      throw new Error('Mật khẩu không đúng');
    }

    res.json({
      status: 200,
      message: 'Login successfully',
      data: student
    });
  } catch (error) {
    res.json({
      status: 400,
      error: error.message,
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

//update
// https://myfpl-service.onrender.com/users/update/:id
router.put('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { newUserName, passWord, class: className, newPassWord } = req.body;

    // duyet sinh vien co id = id
    const student = modelStudent.findById(id);
    //kiem tra password
    const checkPassWord = bcrypt.compareSync(passWord, student.passWord);
    if (!checkPassWord) {
      throw new Error('Mật khẩu không đúng');
    }
    //ma hoa password
    const salt = bcrypt.genSaltSync(10); // mã hoá 10 lần
    const hashPassWord = bcrypt.hashSync(newPassWord, salt); // mã hoá password

    if (student) {
      student.userName = userName ? userName : student.userName;
      student.passWord = hashPassWord ? hashPassWord : student.passWord;
      student.class = className ? className : student.class;
      const result = await student.save();
      if (result) {
        res.json({
          status: 200,
          message: 'Update student successfully',
          data: result,
        });
      } else {
        throw new Error('student not found');
      }
    }

  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});

//delete student
// https://myfpl-service.onrender.com/users/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await modelStudent.findByIdAndDelete(id);
    if (student) {
      res.json({
        status: 200,
        message: 'Delete student successfully',
      });
    } else {
      throw new Error('student not found');
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});


module.exports = router;
