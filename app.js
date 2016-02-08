
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

import routes from './routes';

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(express.static(join(__dirname, 'public')));
app.use('/style', less(join(__dirname, 'public', 'stylesheets', 'style.less')));

browserify.settings({
  transform: [[babelify, {presets: ['es2015', 'stage-0', 'react']}]],
});

app.get('/js/bundle.js', browserify('./public/javascripts/index.js', {
  debug: true,
}));

app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  var msg = err.stack || err.toString();
  console.error(msg);
  if (res.statusCode < 400) res.statusCode = 500;
  if (err.status) res.statusCode = err.status;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(msg));
  if ('HEAD' == req.method) return res.end();
  res.end(msg);
});

if (process.env.NODE_ENV === 'development') {
  const config = {};
  config.watchDir = process.cwd() + '/public';
  config.exts = ['less', 'jade'];
  livereload(app, config);
}

module.exports = app;
