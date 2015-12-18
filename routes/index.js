
import fs from 'fs';
import {Router} from 'express';
import GitHubApi from "github";
import marked from 'marked';

const router = Router();

const github = new GitHubApi({
  version: "3.0.0",
});

router.get('/', (req, res, next) => {
  res.render('index', {});
});

router.get('/shield.svg', (req, res, next) => {
  res.redirect('https://img.shields.io/badge/usability_measures-taken-FF41A2.svg');
});

router.get('/create', (req, res, next) => {
  fs.readFile(__dirname + '/template.md', (err, data) => {
    if (err) throw err;
    res.render('create', {template: data.toString()});
  });
});

router.get('/repo/:user/:repo', (req, res, next) => {
  const {user, repo} = req.params;
  const path = 'README.md';

  github.repos.getContent({
    user, repo, path
  }, (err, data) => {
    if (err) console.log(err);

    if (data) {
      const buf = new Buffer(data.content, 'base64');
      const content = marked(buf.toString('ascii'));

      res.render('repo', {
        user, repo, content
      });
    } else {

      res.redirect('/');
    }
  });
});

module.exports = router;
