// import 'phoenix_html'
import Reveal from 'reveal.js';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Chat from './containers/Chat';
import * as slideActions from './actions/slides';

const presenter = window.location.hostname === 'localhost';

const store = configureStore();

const chatDOM = document.getElementById('chat');

render(
  <Provider store={store}>
    <Chat />
  </Provider>,
  chatDOM
);

Reveal.initialize({
  history: true,
  controls: presenter,
  keyboard: presenter,
  touch: presenter
});

if (presenter) {
  Reveal.addEventListener('slidechanged', () => {
    store.dispatch(slideActions.slideTransition(Reveal.getState()));
  });
  Reveal.addEventListener('fragmentshown', () => {
    store.dispatch(slideActions.slideTransition(Reveal.getState()));
  });
  Reveal.addEventListener('fragmenthidden', () => {
    store.dispatch(slideActions.slideTransition(Reveal.getState()));
  });
}
