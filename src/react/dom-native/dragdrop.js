/* @flow */
import * as projectActions from "../actions/project";

export default function (document, store) {
  document.addEventListener("drop", function(event) {
    store.dispatch(projectActions.clearNodeDropTarget());
  });
};
