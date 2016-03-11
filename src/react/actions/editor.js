import { getFileByPath } from "../utils/project";
import { getFiles as API_getFiles } from "../api/projects";

export const LOAD_FILE = 'OPEN_FILE';

export function openFile(filePath) {
  return (dispatch, getState) => {
    const project = getState().project;
    const _file = getFileByPath(filePath, project);
    const file = Object.assign({}, _file, { path: filePath });
    if (file) {
      if (typeof file.contents === "string") {
        dispatch({ type: "OPEN_FILE", file });
      } else {
        //We need to load this file.
        API_getFiles([filePath], project)
          .then(([file]) => dispatch({ type: "OPEN_FILE", file }));
      }
    } else {
      throw new Error("File not in current project");
    }
  }
}

export function closeFile(file) {
  return (dispatch) => dispatch({ type: "CLOSE_FILE", file });
}
