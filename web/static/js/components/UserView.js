import React, { PropTypes } from 'react';
import UserList from './UserList';

export default class UserView extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  render() {
    const { users } = this.props;
    return (
      <UserList users={users} />
    );
  }
}
