/* @flow */
import { combineReducers } from 'redux';
import project from "./project";
import activeFiles from "./active-files";
import contextMenu from "./context-menu";
import modal from "./modal";

export default combineReducers({
  project,
  activeFiles,
  contextMenu,
  modal
});
