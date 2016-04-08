/* @flow */
import R from "ramda";
import mergeTree from "merge-tree";

const sorter = (a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

/*
  Sort a project tree.
*/
export function sortTree(node) {
  if (node.contents && node.contents.length) {
    const dirs = node.contents.filter(c => c.type === "dir");
    const files = node.contents.filter(c => c.type === "file");
    const contents = dirs.sort(sorter)
      .map(sortTree)
      .concat(files.sort(sorter));
    return Object.assign({}, node, { contents });
  } else {
    return node;
  }
}

/*
  Select an item given a path like a/b/c/d
*/
export function getNodeByPath(path, project) {
  return getNodeByPathArray(path.split("/"), project);
}

/*
  Select an item given a path like ['a', 'b', 'c', 'd'] representing 'a/b/c/d'
*/
export function getNodeByPathArray(pathArray, project) {
  if (!pathArray.length || project.name !== pathArray[0]) {
    return null;
  }
  return pathArray.slice(1).reduce((acc, p) => {
    if (acc && acc.contents && acc.contents.length) {
      const match = acc.contents.filter(i => i.name === p);
      return (match.length) ? match[0] : null;
    } else {
      return null;
    }
  }, project);
}

/*
  Insert an item into the specified parent.
  Parents is an array ['a', 'b', 'c'] representing a/b/c
*/
export function insertItem(item, parents, project) {
  return insertItems([item], parents, project)
}

/*
  Get non-conflicting names for a list of items
  For example if the tree contains nodes a, b and c,
    calling this function with [a, b, d] will give you a1, b1, d
*/
function getUniquelyNamedNodes(items, dir) {
  let contents = dir.contents.slice(0);

  return items.map(item => {
    let {name} = item;
    let i = 0;
    while (contents.filter(c => c.name === name).length) {
      i++;
      name = [item.name.split(".")[0] + i].concat(name.split(".").slice(1)).join(".")
    }
    const result = Object.assign({}, item, { name });
    contents.push(result);
    return result;
  });
}

/*
  Insert an array of items into specified parent.
  Parents is an array ['a', 'b', 'c'] representing a/b/c
*/
export function insertItems(items, parents, project) {
  return mergeTree(
    project,
    "contents",
    [{ parents: parents.slice(0, -1), target: parents.slice(-1)[0] }],
    (dir, name) => dir.name === name,
    (dir, target) => {
      if (dir.name === target) {
        const _items = getUniquelyNamedNodes(items, dir);
        let contents = dir.contents.slice(0).concat(_items);
        const dirs = contents.filter(c => c.type === "dir");
        const files = contents.filter(c => c.type === "file");
        contents = dirs.sort(sorter).concat(files.sort(sorter));
        return Object.assign({}, dir, { contents })
      }
    }
  );
}

/*
  Delete an item from the project tree
  Path is of the form ['a', 'b', 'c'] representing a/b/c to be deleted
*/
export function deleteItem(path, project) {
  return deleteItems([path], project);
}

/*
  Delete a list of items from the project tree
  Path is an array of the form [['a', 'b', 'c'], ['x', 'y', 'z']] representing a/b/c and x/y/z to be deleted
*/
export function deleteItems(paths, project) {
  const crumbs = paths.map(p => {
    return {
      parents: p.slice(0, -2),
      target: { dir: p.slice(-2)[0], item: p.slice(-1)[0] }
    }
  });
  return mergeTree(
    project,
    "contents",
    crumbs,
    (dir, name) => dir.name === name,
    (dir, target) => {
      if (dir.name === target.dir) {
        let contents = dir.contents.slice(0);
        contents = contents.filter(c => c.name !== target.item);
        return Object.assign({}, dir, { contents });
      }
    }
  );
}

/*
  Checks if child path is a descendant of the parent path
*/
export function isDescendantOf(childPath, parentPath) {
  return childPath.length > parentPath.length && R.equals(childPath.slice(0, parentPath.length), parentPath);
}

/*
  Checks if a child path is the immediate child of parent path.
*/
export function isChildOf(childPath, parentPath) {
  return parentPath.length === (childPath.length - 1) && R.equals(childPath.slice(0, parentPath.length), parentPath);
}
