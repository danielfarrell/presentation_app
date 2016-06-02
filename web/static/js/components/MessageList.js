import React, { PropTypes } from 'react';
import MD5 from 'crypto-js/md5';
import Message from './Message';

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.scrollBottom();
  }

  componentWillUpdate() {
    const node = this.refs.messages;
    this.shouldScrollBottom = Math.abs(
      Math.round(
        node.scrollTop + node.offsetHeight - node.scrollHeight
      )
    ) === 0;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.scrollBottom();
    }
  }

  scrollBottom() {
    const node = this.refs.messages;
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const { messages } = this.props;

    const messageItems = messages.map((message) =>
      <Message
        key={MD5(JSON.stringify(message))}
        message={message}
      />
    );

    return (
      <ol ref="messages" className="messages">
        {messageItems}
      </ol>
    );
  }
}
