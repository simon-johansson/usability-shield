
require('babel-register')({
  presets: ['es2015', 'stage-0']
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('./app');
var debug = require('debug')('usability-shield:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
