

var RepoValidator = React.createClass({
  getInitialState() {
    return {
      validRepoSupplied: false
    };
  },

  resetValidation() {
    this.setState({ validRepoSupplied: false });
    this.props.onRepoSelected();
  },

  onChange(event) {
    const val = event.target.value;
    const match = val.match('.*github.com/.*/.*');

    if (match) {
      let arr = match[0]
                .split('github.com/')[1]
                .split('/')
                .filter(n => n != false);

      if (arr.length === 2) {
        this.props.onRepoSelected(...arr);
        this.setState({ validRepoSupplied: true });
      } else this.resetValidation();
    } else this.resetValidation();
  },

  render() {
    const spanStyle = {
      display: this.state.validRepoSupplied ? 'inline' : 'none',
    };

    return (
      <form className="repo-validator">
        <input
          onChange={this.onChange}
          className="repo"
          type="text"
        />
        <span
          style={spanStyle}
          className="mega-octicon octicon-check"
        />
      </form>
    );
  }
});

export default RepoValidator;
