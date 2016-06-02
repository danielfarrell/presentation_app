import React, { PropTypes } from 'react';

export default class MessageForm extends React.Component {
  static propTypes = {
    channel: PropTypes.object,
    sendMessage: PropTypes.func.isRequired
  };

  handleTyping(e) {
    if (e.which === 13) {
      e.preventDefault();
      const target = e.target;
      this.props.sendMessage(target.value);
      target.value = '';
    }
  }

  render() {
    return (
      <form>
        <div className="is-default">
          <textarea
            ref="chatInput"
            onKeyPress={::this.handleTyping}
            placeholder="Join the conversation"
            aria-label="Chat message"
            className="input-contrast comment-form-textarea"
          ></textarea>
        </div>
      </form>
    );
  }
}
