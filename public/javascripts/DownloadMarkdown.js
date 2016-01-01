
var DownloadMarkdown = React.createClass({
  clickHandler() {
    var blob = new Blob([simplemde.value()], {type: "text/markdown;charset=utf-8"});
    saveAs(blob, "usability.md"); //using FileSaver
  },

  render() {
    return (
      <button onClick={this.clickHandler} className="download">
        Download the document
        <span className="mega-octicon octicon-cloud-download"></span>
      </button>
    );
  }
});

export default DownloadMarkdown;
