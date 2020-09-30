const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
// const livereload = require('livereload').createServer({
//   exts: ['js', 'ejs', 'css']
// });
// livereload.watch(path.join(__dirname, 'public'));
// livereload.watch(path.join(__dirname, 'views'));

//!====================//view engine setup//====================!//
app.set("port", process.env.PORT || 80)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//!====================//No More Cache//====================!//
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
//   next();
// });

//!====================//Routes//====================!//
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//!====================//Server Start Listening//====================!//
require('http').createServer(app).listen(app.get('port'), () => {
  console.log("Serve started on:", `http://localhost:${app.get('port')}/`);
});

//!====================//catch 404 and forward to error handler//====================!//
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
