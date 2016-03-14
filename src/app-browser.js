 import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactPlugin from "isotropy-plugin-react";
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import WorkspaceContainer from "./react/containers/workspace-container";
import configureStore from './react/store/configure-store';
import { getProject, getProjectFiles } from "./react/actions/project";
import { openFile } from "./react/actions/editor";
import * as contextMenuActions from "./react/actions/context-menu";

const store = configureStore({ project: {}, activeFiles: { files: [], lastUsed: [] }, contextMenu: { items: [] } });

getProject("my-nodejam-sample")(store.dispatch, store.getState)
  .then(() => getProjectFiles()(store.dispatch, store.getState))
  .then(() => openFile("src/code/app.js")(store.dispatch, store.getState))
  .catch(e => console.log(e.stack));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <WorkspaceContainer />
      </Provider>
    );
  }
}

function onDocumentLoad() {
  const routes = [
    { url: `/`, method: "GET", component: App }
  ];

  const apps = [
    {
      type: "react",
      routes,
      path: "/"
    }
  ];

  document.addEventListener("keydown", onKeyPress, false);

  function onKeyPress(e) {
    const charCode = (typeof e.which == "number") ? e.which : e.keyCode
    if (charCode === 27) {
      contextMenuActions.closeContextMenu()(store.dispatch);
    }
  }

  isotropy(apps, [reactPlugin], {}).catch((e) => console.log(e.stack));
}

if (document.readyState !== 'loading'){
  fn();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentLoad);
}
