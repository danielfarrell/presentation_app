import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';
import * as channelActions from '../actions/channel';
import * as uiActions from '../actions/ui';
import Header from '../components/Header';
import UserView from '../components/UserView';
import MessageView from '../components/MessageView';
import LoginView from '../components/LoginView';

class Chat extends React.Component {
  static propTypes = {
    auth: PropTypes.string,
    ui: PropTypes.object,
    connection: PropTypes.object,
    users: PropTypes.array,
    authActions: PropTypes.object,
    channelActions: PropTypes.object,
    uiActions: PropTypes.object
  };

  constructor(props) {
    super(props);
    if (props.auth) {
      props.channelActions.joinChannel();
    }
    this.state = {
      minimized: props.ui.minimized,
      view: 'messages'
    };
    this.login = ::this.login;
    this.handleSelect = ::this.handleSelect;
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (!this.props.auth && auth) {
      nextProps.channelActions.joinChannel();
    }
  }

  login(e) {
    e.preventDefault();
    const username = e.target[0].value;
    this.props.authActions.chooseUsername(username);
  }

  handleSelect(action) {
    switch (action) {
      case 'messages': {
        this.setState({ view: 'messages' });
        break;
      }
      case 'users': {
        this.setState({ view: 'users' });
        break;
      }
      case 'minimize': {
        this.props.uiActions.minimizeUi(true);
        this.setState({ minimized: true });
        break;
      }
      case 'maximize': {
        this.props.uiActions.minimizeUi(false);
        this.setState({ minimized: false });
        break;
      }
      default: {
        break;
      }
    }
  }

  viewComponent() {
    if (this.state.view === 'users') {
      const { users } = this.props;
      return (
        <UserView users={users} />
      );
    } else if (this.state.view === 'messages') {
      const { connection: { messages } } = this.props;
      return (
        <MessageView
          messages={messages}
          sendMessage={this.props.channelActions.sendMessage}
        />
      );
    }
    return null;
  }

  render() {
    const { auth, connection, users } = this.props;
    const messages = connection.messages;
    const minimized = this.state.minimized;
    const userCount = users.length;
    const messageCount = messages.length;
    const stateClass = minimized ? 'minimized' : '';
    const viewComponent = this.viewComponent();

    if (auth) {
      return (
        <div className={`chat ${stateClass}`}>
          <Header
            userCount={userCount}
            messageCount={messageCount}
            minimized={minimized}
            handleSelect={this.handleSelect}
          />
          {viewComponent}
        </div>
      );
    }
    return (
      <div className="chat">
        <LoginView
          login={this.login}
        />
      </div>
    );
  }
}

const selector = (state) => ({
  connection: state.connection,
  ui: state.ui,
  auth: state.auth,
  users: state.users
});
const actions = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  channelActions: bindActionCreators(channelActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch)
});
export default connect(selector, actions)(Chat);
