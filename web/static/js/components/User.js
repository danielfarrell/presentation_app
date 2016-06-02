import React, { PropTypes } from 'react';

export default class User extends React.Component {
  static propTypes = {
    user: PropTypes.string.isRequired
  };

  static defaultProps = {
  };

  render() {
    const { user } = this.props;
    return (
      <li className="user">
        {user}
      </li>
    );
  }
}
