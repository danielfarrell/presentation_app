import React, { PropTypes } from 'react';

export default class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Choose a username" />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    );
  }
}
