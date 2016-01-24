
import ShieldSelector from './ShieldSelector'
import MarkdownEditor from './MarkdownEditor'
import DownloadMarkdown from './DownloadMarkdown'
import RepoValidator from './RepoValidator'
import PlaceInReadme from './PlaceInReadme'

var ShieldCreationSteps = React.createClass({
  getInitialState() {
    return {
      url: 'http://usability-shield.io',
      user: '[GITHUBUSER]',
      repo: '[REPO]',
      shield: 'https://img.shields.io/badge/usability_measures-taken-FF41A2.svg',
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

            <PlaceInReadme
              text={readmeText}
            />
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>4.</h1>
          </div>
          <div className={wideColClass}>
            <h2>Describe what measures you have taken in order to achieve good usability for your users. No pressure, you can change this later</h2>

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
              <span className='small-text'>(in either your <code>master</code> branch or a branch named <code>usability</code>)</span>
            </h2>
          </div>
        </div>

        <div className={stepClass}>
          <div className={narrowColClass}>
            <h1>6.</h1>
          </div>
          <div className={wideColClass}>
            <h2>Your are all set! Remember to update your <code>usability.md</code> as your project evolves. And...</h2>
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

