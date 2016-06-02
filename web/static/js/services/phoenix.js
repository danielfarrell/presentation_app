import { Socket } from 'phoenix';

let socket;

export function connect() {
  socket = new Socket('/socket');
  socket.connect();
}

export function getChannel(channelName, username) {
  const channel = socket.channel(channelName, { username });
  return channel;
}
