import __polyfill from "babel-polyfill";
import isotropy from "isotropy";
import reactPlugin from "isotropy-plugin-react";
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import WorkspaceContainer from "./react/containers/workspace-container";
import configureStore from './react/store/configure-store';
import * as projectActions from "./react/actions/project";
import * as editorActions from "./react/actions/editor";
import * as contextMenuActions from "./react/actions/context-menu";

const store = configureStore({ project: {}, activeFiles: { files: [], lastUsed: [] }, contextMenu: { items: [] } });

window.__nodejam_ide = window.__nodejam_ide || {};

projectActions.getProject("my-nodejam-sample")(store.dispatch, store.getState)
  .then(() => projectActions.getProjectFiles()(store.dispatch, store.getState))
  .then(() => editorActions.openFile("src/code/app.js")(store.dispatch, store.getState))
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

  const keyboardSettings = window.__nodejam_ide.keyboardSettings || {
    closeActiveFile: { ctrlKey: true, altKey: true, keyCode: 87 }
  };

  document.addEventListener("keydown", onKeyPress, false);

  function onKeyPress(e) {
    if (checkKeycodes(e, { keyCode: 27 })) {
      contextMenuActions.closeContextMenu()(store.dispatch);
    }
    if (checkKeycodes(e, keyboardSettings.closeActiveFile)) {
      editorActions.closeActiveFile()(store.dispatch, store.getState);
      event.preventDefault();
    }
  }

  function checkKeycodes(e, _action) {
    const action = {
      ctrlKey: _action.ctrlKey || false,
      altKey: _action.altKey || false,
      shiftKey: _action.shiftKey || false,
      keyCode: _action.keyCode
    }
    const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    return (action.ctrlKey == e.ctrlKey && action.altKey == e.altKey && action.shiftKey == e.shiftKey && action.keyCode == charCode);
  }

  isotropy(apps, [reactPlugin], {}).catch((e) => console.log(e.stack));
}

if (document.readyState !== 'loading'){
  onDocumentLoad();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentLoad);
}
