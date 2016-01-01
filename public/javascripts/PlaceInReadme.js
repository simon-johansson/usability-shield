
var PlaceInReadme = React.createClass({
  readmeID: 'place-in-readme',
  clipboardClass: 'copy-to-clip',

  componentDidMount() {
    new Clipboard(`.${this.clipboardClass}`);
  },

  render() {
    const target = `#${this.readmeID}`;

    return (
      <div>
        <pre id={this.readmeID}>{this.props.text}</pre>

        <button className={this.clipboardClass} data-clipboard-target={target}>
          Copy to clipboard
          <span className="mega-octicon octicon-clippy"></span>
        </button>
      </div>
    );
  }
});

export default PlaceInReadme;
