function openFile(state, action) {
  const files = (!state.files.some(f => f.name === action.file.name)) ?
    state.files.concat(action.file) :
    state.files;
  const lastUsed = state.lastUsed.filter(f => f !== action.file.name).concat(action.file.name);
  return Object.assign({}, state, { files, lastUsed, active: action.file.name });
}

function closeFile(state, action) {
  //If we closed the currently active file, set the previous file as active.
  let active;

  if (state.active === action.file) {
    const currentIndex = state.files.findIndex(f => f.name === action.file);
    active = (currentIndex > 0) ? state.files[currentIndex - 1].name : (state.files.length > 1) ? state.files[1].name : null;
  } else {
    active = state.active;
  }
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
