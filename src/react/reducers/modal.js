/* @flow */
function openModal(state, action) {
  return Object.assign({}, state, { children: action.children });
}

function closeModal(state, action) {
  return Object.assign({}, { children: null })
}

export default function(state = {}, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return openModal(state, action);
    case "CLOSE_MODAL":
      return closeModal(state, action);
    default:
      return state;
  }
}
