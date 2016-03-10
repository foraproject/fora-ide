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

export default function(state = {}, action) {
  switch (action.type) {
    case "GET_PROJECT":
      return getProject(state, action);
    case "GET_FILES": {
      return getFiles(state, action);
    }
    default:
      return state;
  }
}
