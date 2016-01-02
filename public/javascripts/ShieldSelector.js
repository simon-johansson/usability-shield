
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
      <div>
        {
          srcs.map((src, i) => {
            let active = src === this.state.activeShield ? true : false;
            let classNames = active ? 'shield selected' : 'shield';

            return (
              <img
                key={i}
                className={classNames}
                src={src}
                onClick={this._clickHandler}
              />
            );
          })
        }
      </div>
    )
  }
});

export default ShieldSelector;
