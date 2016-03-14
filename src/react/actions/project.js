import { getProject as API_getProject, getFiles as API_getFiles } from "../api/projects";

export function getProject(project) {
  return (dispatch) => {
    dispatch({ type: "BEGIN_GET_PROJECT", project });
    return new Promise((resolve, reject) => {
      API_getProject(name)
        .then((project) => {
          dispatch({ type: "GET_PROJECT", project });
          resolve(project);
        });
    });
  };
}

export function getProjectFiles() {
  const getFilesInTree = (list, parents) => {
    const results = list.map(
      i => (typeof i.type === "dir") ?
        getFilesInTree(i.contents, parents.concat(i)) :
        parents.map(p => p.name).concat(i.name).join("/")
    );
    return [].concat.apply([], results); //flatten
  };

  return (dispatch, getState) => {
    dispatch({ type: "BEGIN_GET_PROJECT_FILES" });

    return new Promise((resolve, reject) => {
      const project = getState().project;
      const files = getFilesInTree(project.contents, [project]);
      API_getFiles(files, project).then(files => {
        dispatch({ type: "GET_PROJECT_FILES", files });
        resolve(files);
      });
    });
  }
}

export function selectProjectItem(name, parents) {
  return (dispatch) => {
    dispatch({ type: "SELECT_PROJECT_ITEM", name, parents });
  };
}

export function unselectProjectItem() {
  return (dispatch) => {
    dispatch({ type: "UNSELECT_PROJECT_ITEM" });
  };
}
