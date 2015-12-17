var express = require('express');
var GitHubApi = require("github");
var marked = require('marked');

var router = express.Router();

var github = new GitHubApi({
  version: "3.0.0",
});

router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/shield.svg', function(req, res, next) {
  res.redirect('https://img.shields.io/badge/usability_measures-taken-FF41A2.svg');
});

router.get('/repo/:user/:repo', function(req, res, next) {
  var user = req.params.user;
  var repo = req.params.repo;

  github.repos.getContent({
    user: user,
    repo: repo,
    path: 'README.md'
  }, function (err, data) {
    if (err) console.log(err);

    if (data) {
      var buf = new Buffer(data.content, 'base64');

      res.render('repo', {
        user: user,
        repo: repo,
        content: marked(buf.toString('ascii'))
      });
    } else {

      res.redirect('/');
    }
  });
});

module.exports = router;
