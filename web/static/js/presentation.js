import Reveal from 'reveal.js';
window.Reveal = Reveal;

export default function presentation(channel, presenter = false) {
  Reveal.initialize({
    history: true,
    controls: presenter,
    keyboard: presenter,
    touch: presenter
  });

  channel.on('slidechanged', state => {
    Reveal.setState(state);
  });

  channel.join();

  if (presenter) {
    Reveal.addEventListener('slidechanged', () => {
      channel.push('slidechanged', Reveal.getState());
    });
    Reveal.addEventListener('fragmentshown', () => {
      channel.push('slidechanged', Reveal.getState());
    });
    Reveal.addEventListener('fragmenthidden', () => {
      channel.push('slidechanged', Reveal.getState());
    });
  }
}
