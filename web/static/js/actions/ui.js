import { UI_MINIMIZE } from '../constants/ui';

export function minimizeUi(minimized) {
  return {
    type: UI_MINIMIZE,
    payload: { minimized }
  };
}
