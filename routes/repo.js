
import GitHubApi from 'github';
import marked from 'marked';

const github = new GitHubApi({
  version: '3.0.0',
});

export default (req, res, next) => {
  const {user, repo} = req.params;
  const path = 'README.md';
  const ref = 'usability';

  const render = (data) => {
    const buf = new Buffer(data.content, 'base64');
    const content = marked(buf.toString('ascii'));

    res.render('repo', {
      user, repo, content,
      title: `usability-shield for ${user}/${repo}`
    });
  }

  // Check if the repo exists

  const getContent = (params, clb) => {
    github.repos.getContent(params, (err, data) => {
      if (err) console.log(err);
      if (data) render(data);
      else clb(err);
    });
  }

  getContent({user, repo, path}, (err) => {
    getContent({user, repo, path, ref}, (err) => {
      res.redirect('/');
    });
  });
};
