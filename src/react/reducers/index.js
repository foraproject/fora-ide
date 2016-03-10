import { combineReducers } from 'redux';
import project from "./project";
import editor from "./editor";

export default combineReducers({
  project,
  editor
});
