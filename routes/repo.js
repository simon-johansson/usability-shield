
import GitHubApi from 'github';
import marked from 'marked';

const github = new GitHubApi({
  version: '3.0.0',
});

export default (req, res, next) => {
  const {user, repo} = req.params;
  const path = 'usability.md';
  const ref = 'usability';

  const renderRepoView = (data) => {
    const buf = new Buffer(data.content, 'base64');
    const content = marked(buf.toString('ascii'));
    const title = `usability-shield for ${user}/${repo}`;

    res.render('repo', {
      user, repo, content, title
    });
  };

  const renderNotFoundView = (err) => {
    const msg = JSON.parse(err.message).message;
    return res.render('not-found', {
      user, repo, path, ref, msg
    });
  };

  const getMarkdown = (params, clb) => {
    github.repos.getContent(params, (err, data) => {
      if (err) console.log(err);
      if (data) renderRepoView(data);
      else clb(err);
    });
  };

  github.repos.get({user, repo}, (err, data) => {
    if (err && err.code === 404) renderNotFoundView(err);
    // if (data) console.log(data);
    getMarkdown({user, repo, path}, (err) => {
      getMarkdown({user, repo, path, ref}, (err) => {
        if (err && err.code === 404) renderNotFoundView(err);
        // res.redirect('/');
      });
    });
  });
};
