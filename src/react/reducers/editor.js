function openFile(state, action) {
  const files = (!state.files.some(f => f.name === action.file.name)) ?
    state.files.concat(action.file) :
    state.files;
  return Object.assign({}, state, { files, activeFile: action.file.name });
}

export default function(state = {}, action) {
  switch (action.type) {
    case "OPEN_FILE":
      return openFile(state, action);
    default:
      return state;
  }
}
