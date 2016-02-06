
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
      'http://usability-shield.com/img/usability_measures-taken',
      'http://usability-shield.com/img/usability_aspects-considered',
      'http://usability-shield.com/img/usability_testing-done',
      'http://usability-shield.com/img/user_feedback-collected',
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
