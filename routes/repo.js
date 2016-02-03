
import {Router} from 'express';
import GitHubApi from 'github';
import marked from 'marked';

const router = Router();

const github = new GitHubApi({
  version: '3.0.0',
});

router.get('/:user/:repo', (req, res, next) => {
  const {user, repo} = req.params;
  const path = 'README.md';
  const ref = 'usability';

  const render = (data) => {
    const buf = new Buffer(data.content, 'base64');
    const content = marked(buf.toString('ascii'));

    res.render('repo', {
      user, repo, content
    });
  }

  const getContent = (params, clb) => {
    github.repos.getContent(params, (err, data) => {
      if (err) console.log(err);
      if (data) render(data);
      else clb();
    });
  }

  getContent({user, repo, path}, () => {
    getContent({user, repo, path, ref}, () => {
      res.redirect('/');
    });
  });
});

export default router;
