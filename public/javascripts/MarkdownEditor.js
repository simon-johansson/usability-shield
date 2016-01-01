
var MarkdownEditor = React.createClass({
  elementID: 'markdown-editor',

  componentDidMount() {
    window.simplemde = new SimpleMDE({
      element: document.getElementById(this.elementID)
    });
  },

  render() {
    return (
      <textarea
        id={this.elementID}
        onChange={this.onChange}>
      </textarea>
    );
  }
});

export default MarkdownEditor;
