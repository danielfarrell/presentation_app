// import 'phoenix_html'
import React from 'react';
import { render } from 'react-dom';
import { Socket } from 'phoenix';
import { SocketProvider } from 'redux-channels';

import configureStore from './store/configureStore';
import Chat from './containers/Chat';
import presentation from './presentation';

const presenter = window.location.hostname === 'localhost';

const store = configureStore();
const socket = new Socket('/socket');
socket.connect();

const chatDOM = document.getElementById('chat');

if (chatDOM) {
  render(
    <SocketProvider store={store} socket={socket}>
      <Chat />
    </SocketProvider>,
    chatDOM
  );
}

const presentationChannel = socket.channel('presentation');
presentation(presentationChannel, presenter);
