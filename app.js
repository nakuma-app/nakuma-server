require("./models/db");
const config = require("./config");
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('./middlewares/cors.middleware');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const fs = require('fs');
const https = require('https');
const http = require('http');

const RATE_LIMITER = config.rateLimit.local;
const HTTPS_OPTIONS = config.https;

var indexRouter = require('./routes/index.router');
var usersRouter = require('./routes/users.router');
var authRouter = require('./routes/auth.router');
var charactersRouter = require('./routes/characters.router');
var cardsRouter = require('./routes/cards.router');
var packsRouter = require('./routes/packs.router');
var packAccessRouter = require('./routes/pack-access.router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors);
app.use(rateLimit(RATE_LIMITER));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/packs', packsRouter);
app.use('/api/packAccess', packAccessRouter);

const httpsServer = https.createServer({
  key: fs.readFileSync(HTTPS_OPTIONS.key),
  cert: fs.readFileSync(HTTPS_OPTIONS.cert)
}, app);

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

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
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
