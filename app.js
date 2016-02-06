
import express from 'express';
import {join} from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import livereload from 'express-livereload';
import browserify from 'browserify-middleware';
import babelify from 'babelify';
import less from 'less-file';

import * as routes from './routes';

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(express.static(join(__dirname, 'public')));
app.use('/style', less(join(__dirname, 'public', 'stylesheets', 'style.less')));

browserify.settings({
  transform: [[babelify, {presets: ['es2015', 'stage-0', 'react']}]],
});

app.get('/js/bundle.js', browserify('./public/javascripts/index.js', {
  debug: true,
}));

app.use('/', routes.splash);
app.use('/img', routes.img);
app.use('/create', routes.create);
app.use('/repo', routes.repo);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (process.env.NODE_ENV === 'development') {
  const config = {};
  config.watchDir = process.cwd() + '/public';
  config.exts = ['less', 'jade'];
  livereload(app, config);
}

module.exports = app;
