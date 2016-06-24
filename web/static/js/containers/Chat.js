import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux-channels';
import { Presence } from 'phoenix';
import * as allAuthActions from '../actions/auth';
import * as allChannelActions from '../actions/channel';
import * as allUiActions from '../actions/ui';
import * as allUserActions from '../actions/users';
import Header from '../components/Header';
import UserView from '../components/UserView';
import MessageView from '../components/MessageView';
import LoginView from '../components/LoginView';

class Chat extends React.Component {
  static propTypes = {
    auth: PropTypes.string,
    ui: PropTypes.object,
    messages: PropTypes.object,
    users: PropTypes.object,
    authActions: PropTypes.object,
    channelActions: PropTypes.object,
    uiActions: PropTypes.object,
    userActions: PropTypes.object,
    chatChannel: PropTypes.object
  };

  constructor(props) {
    super(props);
    const { auth, channelActions, chatChannel, ui } = props;
    this.chatChannel = chatChannel;
    this.presences = {};
    this.state = {
      minimized: ui.minimized,
      view: 'messages'
    };
    this.login = ::this.login;
    this.sendMessage = ::this.sendMessage;
    this.handleSelect = ::this.handleSelect;
    this.userJoin = ::this.userJoin;
    this.userLeave = ::this.userLeave;
    this.presenceInitial = ::this.presenceInitial;
    this.presenceDiff = ::this.presenceDiff;
    this.receiveMessage = ::this.receiveMessage;

    chatChannel.on('presences', this.presenceInitial);
    chatChannel.on('presence_diff', this.presenceDiff);
    chatChannel.on('shout', this.receiveMessage);
    if (auth) {
      chatChannel.join()
      .receive('ok', resp => { channelActions.channelJoinSuccess(chatChannel, resp); })
      .receive('error', resp => { channelActions.channelJoinFailure(chatChannel, resp); });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (!this.props.auth && auth) {
      this.chatChannel.join();
    }
  }

  login(e) {
    e.preventDefault();
    const username = e.target[0].value;
    this.props.authActions.chooseUsername(username);
  }

  sendMessage(message) {
    const { auth } = this.props;
    this.chatChannel.push('shout', { username: auth, message });
    // this.forceUpdate();
  }

  // detect if user has joined for the 1st time or from another tab/device
  userJoin(id, current, _newPres) {
    const { userActions } = this.props;
    if (!current) {
      userActions.userJoined(id);
      // this.forceUpdate();
    }
  }

  // detect if user has left from all tabs/devices, or is still present
  userLeave(id, current, _leftPres) {
    const { userActions } = this.props;
    if (current.metas.length === 0) {
      userActions.userLeft(id);
      // this.forceUpdate();
    }
  }

  presenceInitial(source) {
    Presence.syncState(this.presences, source, this.userJoin, this.userLeave);
  }

  presenceDiff(diff) {
    Presence.syncDiff(this.presences, diff, this.userJoin, this.userLeave);
  }

  receiveMessage(data) {
    const { channelActions } = this.props;
    channelActions.receiveData(data);
    // this.forceUpdate();
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
      const { messages } = this.props;
      return (
        <MessageView
          messages={messages}
          sendMessage={this.sendMessage}
        />
      );
    }
    return null;
  }

  render() {
    const { auth, messages, users } = this.props;
    const minimized = this.state.minimized;
    const userCount = users.size;
    const messageCount = messages.size;
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

const mapStateToProps = (state) => ({
  messages: state.messages,
  ui: state.ui,
  auth: state.auth,
  users: state.users
});
const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(allAuthActions, dispatch),
  channelActions: bindActionCreators(allChannelActions, dispatch),
  uiActions: bindActionCreators(allUiActions, dispatch),
  userActions: bindActionCreators(allUserActions, dispatch)
});
const mapSocketToProps = ({ socket, state }) => ({
  chatChannel: socket.channel('chat', { username: state.auth })
});
export default connect({
  mapStateToProps,
  mapDispatchToProps,
  mapSocketToProps
})(Chat);
