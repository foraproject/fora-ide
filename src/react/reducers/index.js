import { combineReducers } from 'redux';
import project from "./project";
import activeFile from "./active-file";

export default combineReducers({
  project,
  activeFile
});
