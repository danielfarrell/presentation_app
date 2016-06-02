import React, { PropTypes } from 'react';
import User from './User';

export default class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  static defaultProps = {
    users: []
  }

  render() {
    const { users } = this.props;


    const userItems = users.map((user) =>
      <User
        key={user}
        user={user}
      />
    );

    return (
      <ol ref="users" className="users">
        {userItems}
      </ol>
    );
  }
}
