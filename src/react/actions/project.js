import { openContextMenu } from "./context-menu";
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

export function copyDirOrFile(name, parents, nodeType) {
  return { type: 'SET_PROJECT_CLIPBOARD_ITEMS', name, parents, nodeType, action: "COPY" };
}

export function cutDirOrFile(name, parents, nodeType) {
  return { type: 'SET_PROJECT_CLIPBOARD_ITEMS', name, parents, nodeType, action: "CUT" };
}

export function pasteDirOrFile(name, parents, nodeType) {
  return (dispatch) => {
    dispatch({ type: 'PASTE_PROJECT_CLIPBOARD_ITEMS', name, parents, nodeType });
  }
}

export function deleteDirOrFile(name, parents, nodeType) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_PROJECT_ITEM', name, parents, nodeType });
  }
}

export function selectProjectItem(name, parents, nodeType, unselectPrevious) {
  return { type: "SELECT_PROJECT_ITEM", name, parents, nodeType, unselectPrevious };
}


export function selectMultipleProjectItems(name, parents, nodeType) {
  return { type: "SELECT_MULTIPLE_PROJECT_ITEMS", name, parents, nodeType };
}

export function unselectProjectItem() {
  return { type: "UNSELECT_PROJECT_ITEM" };
}

export function expandDir(name, parents, nodeType) {
  return { type: "EXPAND_DIR", name, parents, nodeType };
}

export function collapseDir(name, parents, nodeType) {
  return { type: "COLLAPSE_DIR", name, parents, nodeType };
}

export function showContextMenu(items, position, predicate) {
  return (dispatch, getState) => {
    const { project } = getState();
    if (!predicate || predicate(project)) {
      dispatch(openContextMenu(items, position));
    }
  }
}
