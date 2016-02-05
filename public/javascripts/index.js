
import ShieldSelector from './ShieldSelector'
import MarkdownEditor from './MarkdownEditor'
import DownloadMarkdown from './DownloadMarkdown'
import RepoValidator from './RepoValidator'
import PlaceInReadme from './PlaceInReadme'

var ShieldCreationSteps = React.createClass({
  getInitialState() {
    return {
      url: 'http://usability-shield.com',
      user: '[GITHUBUSER]',
      repo: '[REPO]',
      shield: 'https://img.shields.com/badge/usability_measures-taken-FF41A2.svg',
    };
  },

  componentDidMount() {
    this._show();
  },

  _show() {
    ReactDOM.findDOMNode(this).classList.add('show');
  },

  _setShield(shield) {
    this.setState({ shield });
  },

  _setRepo(user = '[GITHUBUSER]', repo = '[REPO]') {
    this.setState({ user, repo });
  },

  render: function() {
    const stepClass = 'pure-g step';
    const stepNumberClass = 'step-number';
    const narrowColClass = 'pure-u-1-12';
    const wideColClass = 'pure-u-11-12';

    const readmeText = [
      `[![Usability status][usability-image]][usability-url]\n\n`,

      `[usability-image]: ${this.state.shield}\n`,
      `[usability-url]: ${this.state.url}/repo/${this.state.user}/${this.state.repo}`
    ].join('');

    return (
      <div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1 className={stepNumberClass}>1.</h1>
          </div>
          <div className={wideColClass}>
            <p>Pick a shield</p>

            <ShieldSelector
              onShieldSelected={this._setShield}
              shield={this.state.shield}
            />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <span className={stepNumberClass}>2.</span>
          </div>
          <div className={wideColClass}>
            <p>Paste in the URL to your GitHub repo</p>

            <RepoValidator
              onRepoSelected={this._setRepo}
              user={this.state.user}
              repo={this.state.repo}
            />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <span className={stepNumberClass}>3.</span>
          </div>
          <div className={wideColClass}>
            <p> Place this in your <code>README.md</code></p>

            <PlaceInReadme
              text={readmeText}
            />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <span className={stepNumberClass}>4.</span>
          </div>
          <div className={wideColClass}>
            <p>Describe what measures you have taken in order to achieve good usability for your users. No pressure, you can change this later</p>

            <MarkdownEditor />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <span className={stepNumberClass}>5.</span>
          </div>
          <div className={wideColClass}>
            <p className='increased-lineheight'>
              <DownloadMarkdown />
              and place it in the root of your repo <br/>
              <span className='small-text'>(in either your <code>master</code> branch or a branch named <code>usability</code>)</span>
            </p>
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <span className={stepNumberClass}>6.</span>
          </div>
          <div className={wideColClass}>
            <p>Your are all set! Remember to update your <code>usability.md</code> as your project evolves. And...</p>
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

