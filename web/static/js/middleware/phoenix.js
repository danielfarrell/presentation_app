import actions from '../actions';
import { Socket, Presence } from 'phoenix';

const phoenixMiddleware = (() => {
  let socket;
  const presences = {};

  const onOpen = (ws, store, token) => evt => {
    // Send a handshake, or authenticate with remote end

    // Tell the store we're connected
    store.dispatch(actions.connected());
  };

  const onClose = (ws, store) => evt => {
    // Tell the store we've disconnected
    store.dispatch(actions.disconnected());
  };

  const onMessage = (ws, store) => evt => {
    // Parse the JSON message received on the websocket
    const msg = JSON.parse(evt.data);
    switch (msg.type) {
      case 'CHAT_MESSAGE':
        // Dispatch an action that adds the received message to our state
        store.dispatch(actions.messageReceived(msg));
        break;
      default:
        console.log(`Received unknown message type: "${msg.type}"`);
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {

      // The user wants us to connect
      case 'CONNECT': {
        // Start a new connection to the server
        if (socket != null) {
          socket.close();
        }

        // Attempt to connect (we could send a 'failed' action on error)
        socket = new Socket('/socket');
        break;
      }

      // The user joins a channel
      case 'JOIN': {
        const channel = socket.channel(channelName, action.payload);

        channel.join()
          .receive('ok', resp => { console.log('Joined successfully', resp) })
          .receive('error', resp => { console.log('Unable to join', resp) });
        store.dispatch(actions.joinedChannel(channel));
        break;
      }

      // The user wants us to disconnect
      case 'DISCONNECT':
        if (socket != null) {
          socket.close();
        }
        socket = null;

        // Set our state to disconnected
        store.dispatch(actions.disconnected());
        break;

      // Send the 'SEND_MESSAGE' action down the channel to the server
      case 'SEND_CHAT_MESSAGE':
        socket.send(action.payload);
        break;

      // This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  };
})();

export default phoenixMiddleware;
