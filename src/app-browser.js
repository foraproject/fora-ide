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
import setupKeyboardShortcuts from "./react/dom-native/keyboard-shortcuts";
import setupDragDrop from "./react/dom-native/drag-drop";

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

  setupKeyboardShortcuts(document, store);
  setupDragDrop(document, store);

  isotropy(apps, [reactPlugin], {}).catch((e) => console.log(e.stack));
}

if (document.readyState !== 'loading'){
  onDocumentLoad();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentLoad);
}
