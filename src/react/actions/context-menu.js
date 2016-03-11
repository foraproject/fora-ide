export const OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU';
export const CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';

export function openContextMenu(items, position) {
  return (dispatch) => {
    dispatch({ type: 'OPEN_CONTEXT_MENU', items, position });
  }
}

export function closeContextMenu() {
  return (dispatch) => {
    dispatch({ type: 'CLOSE_CONTEXT_MENU' });
  }
}
