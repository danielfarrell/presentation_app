import React, { PropTypes } from 'react';
import moment from 'moment';

export default class Message extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  render() {
    const { message } = this.props;
    const timestamp = moment(message.timestamp).format('h:mm:ssa');

    return (
      <li className="message">
        <section className="message__meta">
          <span className="message__user">{message.username}</span>
          <span className="message__timestamp">{timestamp}</span>
        </section>
        <section className="message__content">
          {message.message}
        </section>
      </li>
    );
  }
}
