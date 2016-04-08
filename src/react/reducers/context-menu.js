/* @flow */
function openContextMenu(state, action) {
  return Object.assign({}, state, { items: action.items, position: action.position });
}

function closeContextMenu(state, action) {
  return Object.assign({}, { items: [] })
}

export default function(state = {}, action) {
  switch (action.type) {
    case "OPEN_CONTEXT_MENU":
      return openContextMenu(state, action);
    case "CLOSE_CONTEXT_MENU":
      return closeContextMenu(state, action);
    default:
      return state;
  }
}
