
import GitHubApi from 'github';

const fileToFetch = 'usability.md';
const defaultBranch = 'master';
const appBranch = 'usability';

export default class GithubMarkdownFetcher extends GitHubApi {
  constructor(user, repo, version = '3.0.0') {
    super({ version });

    this.user = user;
    this.repo = repo;
  }

  getMarkdown() {
    return this._getBranchesFromRepo()
            .then(::this._processBranches)
            .then(::this._getMarkdownFromRepo)
  }

  _getBranchesFromRepo() {
    const { user, repo } = this;
    return new Promise((resolve, reject) => {
      this.repos.getBranches({ user, repo }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  _processBranches(data) {
    const branches = data.map(branch => branch.name);
    this.hasAppBranch = branches.indexOf(appBranch) !== -1 ? true : false;
  }

  _getMarkdownFromRepo() {
    return new Promise((resolve, reject) => {
      this._getContentFromBranch(defaultBranch, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  };

  _getContentFromBranch(ref = 'master', clb) {
    const { user, repo } = this;
    const path = fileToFetch;

    this.repos.getContent({ user, repo, path, ref }, (err, data) => {
      if (err) {
        if (this._shouldGetContentFromAppBranch(ref)) {
          return this._getContentFromBranch(appBranch, clb);
        } else {
          return clb(err);
        }
      }
      clb(null, data)
    });
  }

  _shouldGetContentFromAppBranch(branch) {
    return branch === 'master' && this.hasAppBranch;
  }
}
