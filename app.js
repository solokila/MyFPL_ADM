var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var branchRouter = require('./routes/branch-router');
var notificationRouter = require('./routes/notification-router');
var transcriptRouter = require('./routes/transcript-router');
var scheduleRouter = require('./routes/schedule-router');
var examRouter = require('./routes/exam-router');
var subjectRouter = require('./routes/subject-router');
var attendanceRouter = require('./routes/attendance-router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ps25861:ps25861@cluster0.7yirlq3.mongodb.net/MyFPL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connect to mongodb successfully');
}).catch((err) => {
    console.log('Connect to mongodb failed :' + err);
});

// tạo đường dẫn cho các router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/branch', branchRouter);
app.use('/notification', notificationRouter);
app.use('/transcript', transcriptRouter);
app.use('/schedule', scheduleRouter);
app.use('/exam', examRouter);
app.use('/subject', subjectRouter);
app.use('/attendance', attendanceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
