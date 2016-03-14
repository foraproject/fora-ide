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
