import mergeTree from "merge-tree";
import * as projectUtils from "../utils/project";

function getProject(state, action) {
  return projectUtils.sortTree(action.project);
}

function getFiles(state, action) {
  const crumbs = action.files.map(file => {
    return {
      parents: file.name.split("/").slice(0, -1),
      target: file
    }
  });

  return mergeTree(
    state,
    "contents",
    crumbs,
    (dir, p) => dir.name === p,
    (file, leaf) => file.name === leaf.name ? Object.assign({}, file, { contents: leaf.contents }) : file
  );
}

function selectProjectItem(state, action) {
  return Object.assign({}, state, { selected: { name: action.name, parents: action.parents } });
}

function unselectProjectItem(state, action) {
  return Object.assign({}, state, { selected: {} });
}

function collapseDir(collapsed, state, action) {
  const crumbs = [{
    parents: action.parents,
    target: action.name
  }];

  return mergeTree(
    state,
    "contents",
    crumbs,
    (dir, p) => dir.name === p,
    //(file, leaf) => file.name === leaf.name ? Object.assign({}, file, { collapsed }) : file
    (file, name) => {
      return file.name === name ? Object.assign({}, file, { collapsed }) : file
    }
  );
}

function getClipboardItem(state, action) {

}

function setClipboardItem(state, action) {
  return Object.assign({}, state, { clipBoard: [{ parents: action.parents, ...action }]});
}

function pasteClipboardItem(state, action) {
  const item = state.clipBoard.length ? state.clipBoard[0] : null;

  if (item) {
    const itemPath = item.parents.concat(item.name);
    const node = projectUtils.getNodeByPathArray(itemPath, state);
    if (node) {
      const insertionPath = action.nodeType === "file" ? action.parents : action.parents.concat(action.name);
      /*
        1. Insertion point should not be a descendant of the item being pasted.
        2. Item being pasted should not be a child of Insertion point (why paste then?)
      */
      if (!projectUtils.isChildOf(itemPath, insertionPath) && !projectUtils.isDescendantOf(insertionPath, itemPath)) {
        const changedState = projectUtils.insertItem(node, insertionPath, state);

        return (item.action === "CUT") ?
          Object.assign({}, projectUtils.deleteItem(item.parents.concat(item.name), changedState), { clipBoard: [] }) :
          changedState;
      } else {
        alert("boomer")
      }
    }
  }
  return state;
}

function deleteProjectItem(state, action) {
  return projectUtils.deleteItem(action.parents.concat(action.name), state);
}

export default function(state = {}, action) {
  switch (action.type) {
    case "GET_PROJECT":
      return getProject(state, action);
    case "GET_FILES": {
      return getFiles(state, action);
    }
    case "SELECT_PROJECT_ITEM": {
      return selectProjectItem(state, action);
    }
    case "UNSELECT_PROJECT_ITEM": {
      return unselectProjectItem(state, action);
    }
    case "EXPAND_DIR": {
      return collapseDir(false, state, action);
    }
    case "COLLAPSE_DIR": {
      return collapseDir(true, state, action);
    }
    case "GET_PROJECT_CLIPBOARD_ITEM": {
      return getClipboardItem(state, action);
    }
    case "SET_PROJECT_CLIPBOARD_ITEM": {
      return setClipboardItem(state, action);
    }
    case "PASTE_PROJECT_CLIPBOARD_ITEM": {
      return pasteClipboardItem(state, action);
    }
    case "DELETE_PROJECT_ITEM": {
      return deleteProjectItem(state, action);
    }
    default:
      return state;
  }
}
