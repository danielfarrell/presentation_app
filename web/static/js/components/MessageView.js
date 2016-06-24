import React, { PropTypes } from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

export default class MessageView extends React.Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired
  };

  render() {
    const { messages, sendMessage } = this.props;
    return (
      <div>
        <MessageList messages={messages} />
        <MessageForm sendMessage={sendMessage} />
      </div>
    );
  }
}
