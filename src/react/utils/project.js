import mergeTree from "merge-tree";

const sorter = (a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

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

export function getNodeByPath(path, project) {
  return getNodeByPathArray(path.split("/"), project);
}

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

export function insertItem(item, parents, project) {
  return insertItems([item], parents, project)
}

export function insertItems(items, parents, project) {
  return mergeTree(
    project,
    "contents",
    [{ parents: parents.slice(0, -1), target: parents.slice(-1)[0] }],
    (dir, name) => dir.name === name,
    (dir, target) => {
      if (dir.name === target) {
        let contents = dir.contents.slice(0).concat(items);
        const dirs = contents.filter(c => c.type === "dir");
        const files = contents.filter(c => c.type === "file");
        contents = dirs.sort(sorter).concat(files.sort(sorter));
        return Object.assign({}, dir, { contents })
      }
    }
  );
}

export function deleteItem(path, project) {
  return deleteItems([path], project);
}

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

export function isDescendantOf(childPathArray, parentPathArray) {
  return parentPathArray.length < childPathArray.length && parentPathArray.every((p, i) => p === childPathArray[i]);
}

export function isChildOf(childPathArray, parentPathArray) {
  return parentPathArray.length === (childPathArray.length - 1) && parentPathArray.every((p, i) => p === childPathArray[i]);
}
