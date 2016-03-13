export const BEGIN_GET_PROJECT = 'BEGIN_GET_PROJECT';
export const GET_PROJECT = 'GET_PROJECT';
export const BEGIN_GET_PROJECT_FILES = 'BEGIN_GET_PROJECT_FILES';
export const GET_PROJECT_FILES = 'GET_PROJECT_FILES';

import { getProject as API_getProject, getFiles as API_getFiles } from "../api/projects";

export function getProject(project) {
  return (dispatch) => {
    dispatch({ type: BEGIN_GET_PROJECT, project });
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
    dispatch({ type: BEGIN_GET_PROJECT_FILES });

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
