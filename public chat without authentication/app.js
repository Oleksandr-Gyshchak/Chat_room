const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

require('./configs/mongo');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.set(path.join(__dirname, 'views'));
app.set("view engine", "hbs");

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', apiRouter);


app.use(function (err, req, res, next) {
    console.error(err.message);
    res.status(err.status || 500).json({
        error: err.message
    });
});

module.exports = app;