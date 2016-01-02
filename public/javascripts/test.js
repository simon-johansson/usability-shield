
import ShieldSelector from './ShieldSelector'
import MarkdownEditor from './MarkdownEditor'
import DownloadMarkdown from './DownloadMarkdown'
import RepoValidator from './RepoValidator'
import PlaceInReadme from './PlaceInReadme'

var ShieldCreationSteps = React.createClass({
  getInitialState() {
    return {
      user: '[GITHUBUSER]',
      repo: '[REPO]',
      shield: 'https://img.shields.io/badge/usability_measures-taken-FF41A2.svg',
    };
  },

  _setShield(shield) {
    this.setState({ shield });
  },

  _setRepo(user = '[GITHUBUSER]', repo = '[REPO]') {
    this.setState({ user, repo });
  },

  render: function() {
    const stepClass = 'pure-g step';
    const narrowColClass = 'pure-u-1-12';
    const wideColClass = 'pure-u-11-12';

    const readmeText = [
      `[![UX status][ux-image]][ux-url]\n\n`,

      `[ux-image]: ${this.state.shield}\n`,
      `[ux-url]: http://l:3000/repo/${this.state.user}/${this.state.repo}`
    ].join('');

    return (
      <div className="wrapper">

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>1.</h1>
          </div>
          <div className={wideColClass}>
            <h2>Pick a shield</h2>

            <ShieldSelector
              onShieldSelected={this._setShield}
              shield={this.state.shield}
            />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>2.</h1>
          </div>
          <div className={wideColClass}>
            <h2>Paste in the URL to your GitHub repo</h2>

            <RepoValidator
              onRepoSelected={this._setRepo}
              user={this.state.user}
              repo={this.state.repo}
            />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>3.</h1>
          </div>
          <div className={wideColClass}>
            <h2> Place this in your <code>README.md</code></h2>

            <PlaceInReadme text={readmeText} />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>4.</h1>
          </div>
          <div className={wideColClass}>
            <h2>Write a bit about what measures you have taken in order to ensure a good user experience (no pressure, you can change this later)</h2>

            <MarkdownEditor />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>5.</h1>
          </div>
          <div className={wideColClass}>
            <h2 className='increased-lineheight'>
              <DownloadMarkdown />
              and place it in the root of your repo <br/>
              <span className='small-text'>(in either your <code>master</code> branch or a branch named <code>ux</code>)</span>
            </h2>
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>6.</h1>
          </div>
          <div className={wideColClass}>
            <h2>Your are all set! Remember to update your <code>ux.md</code> as your project evolves</h2>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ShieldCreationSteps />,
  document.getElementById('creation-steps')
);

