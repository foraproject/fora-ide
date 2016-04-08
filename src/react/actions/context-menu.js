/* @flow */
export function openContextMenu(items, position) {
  return { type: 'OPEN_CONTEXT_MENU', items, position };
}

export function closeContextMenu() {
  return { type: 'CLOSE_CONTEXT_MENU' };
}
