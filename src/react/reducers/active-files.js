function openFile(state, action) {
  const files = (!state.files.some(f => f.name === action.file.name)) ?
    state.files.concat(action.file) :
    state.files;
  const lastUsed = state.lastUsed.filter(f => f !== action.file.name).concat(action.file.name);
  return Object.assign({}, state, { files, lastUsed, active: action.file.name });
}

function closeFile(state, action) {
  //If we closed the currently active file, set the previous file as active.
  const active = (state.active === action.file) ?
    state.files[state.files.findIndex(f => f.name === action.file) - 1].name :
    state.active;
  const files = state.files.filter(f => f.name !== action.file);
  const lastUsed = state.lastUsed.filter(f => f !== action.file);
  return Object.assign({}, state, { files, lastUsed, active });
}

export default function(state = {}, action) {
  switch (action.type) {
    case "OPEN_FILE":
      return openFile(state, action);
    case "CLOSE_FILE":
      return closeFile(state, action);
    default:
      return state;
  }
}
