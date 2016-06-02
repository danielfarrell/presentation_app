import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';

export default class LoginView extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  render() {
    const { login } = this.props;
    return (
      <div className="blankslate spacious">
        <span className="mega-octicon octicon-comment-discussion"></span>
        <h3>Back channel</h3>
        <LoginForm handleSubmit={login} />
      </div>
    );
  }
}
