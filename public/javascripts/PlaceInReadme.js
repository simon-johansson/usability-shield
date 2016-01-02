
var PlaceInReadme = React.createClass({
  getInitialState() {
    return ({
      readmeID: 'place-in-readme',
      clipboardClass: 'copy-to-clip',
    });
  },

  componentDidMount() {
    new Clipboard(`.${this.state.clipboardClass}`);
  },

  render() {
    const target = `#${this.state.readmeID}`;

    return (
      <div>
        <pre id={this.state.readmeID}>{this.props.text}</pre>

        <button className={this.state.clipboardClass} data-clipboard-target={target}>
          Copy to clipboard
          <span className="mega-octicon octicon-clippy"></span>
        </button>
      </div>
    );
  }
});

export default PlaceInReadme;
