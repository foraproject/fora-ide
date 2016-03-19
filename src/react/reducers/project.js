import R from "ramda";
import mergeTree from "merge-tree";
import * as projectUtils from "../utils/project";

/*
  Get all items in the project.
  And sort them.
*/
function getProject(state, action) {
  return projectUtils.sortTree(action.project);
}

/*
  Get contents of specific files.
*/
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

/*
  Select an item, or add to an existing selection if unselectPrevious is false
*/
function selectProjectItem(state, action) {
  const item = { name: action.name, parents: action.parents };

  /*
    If this item is already selected and unselectPrevious, unselect it (but nothing else).
    Happens when shift clicking an already selected item. This should result in a toggle.
  */
  const currentSelection = state.selected || [];
  const selected = (!action.unselectPrevious && currentSelection.some(s => s.name === item.name && R.equals(s.parents, item.parents))) ?
    currentSelection.filter(s => s.name !== item.name || !R.equals(s.parents, item.parents)) :
    action.unselectPrevious ? [item] : (currentSelection || []).concat(item);
  return Object.assign({}, state, { selected });
}


/*
  Select multiple items
  - Find sibling nodes that are already selected
  - If exists, select everything from last clicked sibling to this node (in both directions)
  - If there is no sibling node, this click is invalid. Do nothing.
*/
function selectMultipleProjectItems(state, action) {
  const selected = state.selected || [];
  const item = { name: action.name, parents: action.parents };

  //Find siblings
  const siblings = selected.filter(s => R.equals(s.parents, item.parents));
  if (siblings.length) {
    const parentNode = projectUtils.getNodeByPathArray(item.parents, state);
    const itemIndex = parentNode.contents.findIndex(i => i.name === item.name);
    const lastSelectedSiblingIndex = parentNode.contents.findIndex(i => i.name === siblings.slice(-1)[0].name);
    const startIndex = Math.min(itemIndex, lastSelectedSiblingIndex);
    const endIndex = startIndex + Math.abs(itemIndex - lastSelectedSiblingIndex) + 1;
    const matches = parentNode.contents.slice(startIndex, endIndex);
    const newlySelected = matches.map(i => { return { name: i.name, parents: item.parents }; });
    const finalSelection = selected.concat(newlySelected.filter(i => !selected.some(s => i.name === s.name)));
    return Object.assign({}, state, { selected: finalSelection });
  } else {
    return state;
  }
}


/*
  Unselect all items
*/
function unselectProjectItem(state, action) {
  return Object.assign({}, state, { selected: [] });
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

/*
  The item from clipBoard
*/
function getClipboardItem(state, action) {

}

/*
  Add an item into the clipboard
*/
function setClipboardItems(state, action) {
  const items = (state.selected || []).map(i => Object.assign({}, i, { action: action.action }));
  return Object.assign({}, state, { clipBoard: items });
}

/*
  Paste clipboard item on the specified node
*/
function pasteClipboardItems(_state, action) {
  let state = _state;
  for (let item of (state.clipBoard || [])) {
    const itemPath = item.parents.concat(item.name);
    const node = projectUtils.getNodeByPathArray(itemPath, state);
    if (node) {
      const insertionPath = action.nodeType === "file" ? action.parents : action.parents.concat(action.name);
      /*
        1. Insertion point should not be a descendant of the item being pasted.
        2. If action == CUT, item being pasted should not be a child of Insertion point (why paste then?)
      */
      if ((item.action !== "CUT" || !projectUtils.isChildOf(itemPath, insertionPath)) && !projectUtils.isDescendantOf(insertionPath, itemPath)) {
        const changedState = projectUtils.insertItem(node, insertionPath, state);

        state = (item.action === "CUT") ?
          Object.assign({}, projectUtils.deleteItem(item.parents.concat(item.name), changedState), { clipBoard: [] }) :
          Object.assign({}, changedState);
      }
    }
  }
  return state;
}

/*
  Delete a project item
*/
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
    case "SELECT_MULTIPLE_PROJECT_ITEMS": {
      return selectMultipleProjectItems(state, action);
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
    case "SET_PROJECT_CLIPBOARD_ITEMS": {
      return setClipboardItems(state, action);
    }
    case "PASTE_PROJECT_CLIPBOARD_ITEMS": {
      return pasteClipboardItems(state, action);
    }
    case "DELETE_PROJECT_ITEM": {
      return deleteProjectItem(state, action);
    }
    default:
      return state;
  }
}
