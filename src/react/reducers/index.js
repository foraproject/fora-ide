import { combineReducers } from 'redux';
import project from "./project";
import activeFiles from "./active-files";

export default combineReducers({
  project,
  activeFiles
});
