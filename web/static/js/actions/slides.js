export function slideTransition(params) {
  return function transitioner(_dispatch, getState) {
    const { connection: { channel } } = getState();
    if (channel) {
      channel.push('slidechanged', params);
    }
  };
}
