
var Shield = React.createClass({
  render: function() {
    const classNames = this.props.active ? 'shield selected' : 'shield';

    return <img className={classNames} onClick={this.props.clickHandler} src={this.props.src}/>;
  }
});

var ShieldSelector = React.createClass({
  getInitialState() {
    return {
      activeShield: ''
    };
  },

  _clickHandler(event) {
    this.setState({ activeShield: event.target.src });
    this.props.onShieldSelected(event.target.src);
  },

  render: function() {
    const srcs = [
      'https://img.shields.io/badge/usability_measures-taken-FF41A2.svg',
      'https://img.shields.io/badge/usability_aspects-considered-FF41A2.svg',
      'https://img.shields.io/badge/UX-approved-FF41A2.svg',
      'https://img.shields.io/badge/user_value-good-FF41A2.svg',
      'https://img.shields.io/badge/user_testing-done-FF41A2.svg',
    ];

    return (
      <div className="pure-g step">
        <div className="pure-u-1-12">
          <h1>1.</h1>
        </div>
        <div className="pure-u-11-12">
          <h2>Pick a shield</h2>
          {srcs.map((src, i) => {
            var active = src === this.state.activeShield ? true : false;
            return (
              <Shield
                clickHandler={this._clickHandler}
                key={i}
                parent={this}
                src={src}
                active={active}
              />
            );
          })}
        </div>
      </div>
    )
  }
});

export default ShieldSelector;
