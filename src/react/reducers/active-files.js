function openFile(state, action) {
  const files = (!state.files.some(f => f.name === action.file.name)) ?
    state.files.concat(action.file) :
    state.files;
  const lastUsed = state.lastUsed.filter(f => f !== action.file.name).concat(action.file.name);
  return Object.assign({}, state, { files, lastUsed, active: action.file.name });
}

function closeFile(state, action) {
  const files = state.files.filter(f => f.name !== action.file);
  const lastUsed = state.lastUsed.filter(f => f !== action.file);
  const active = lastUsed.slice(-1)[0];
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
