import { getFileByPath } from "../utils/project";

function getProject(state, action) {
  return action.project;
}

function getFiles(state, action) {
  const cloned = JSON.parse(JSON.stringify(state));

  for (let file in action.files) {
    const current = getFileByPath(file.name, cloned);
    if (current) {
      current.contents = file.contents;
    }
  }
  return cloned;
}

function selectProjectItem(state, action) {
  return Object.assign({}, state, { selected: { name: action.name, parents: action.parents } });
}

function unselectProjectItem(state, action) {
  return Object.assign({}, state, { selected: {} });
}

export default function(state = {}, action) {
  switch (action.type) {
    case "GET_PROJECT":
      return getProject(state, action);
    case "GET_FILES": {
      return getFiles(state, action);
    }
    case "SELECT_PROJECT_ITEM": {
      return selectProjectItem(state, action);
    }
    case "UNSELECT_PROJECT_ITEM": {
      return unselectProjectItem(state, action);
    }
    default:
      return state;
  }
}
