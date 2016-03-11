import { combineReducers } from 'redux';
import project from "./project";
import activeFiles from "./active-files";
import contextMenu from "./context-menu";

export default combineReducers({
  project,
  activeFiles,
  contextMenu
});
