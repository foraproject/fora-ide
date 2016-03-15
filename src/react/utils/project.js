export function getFileByPath(path, project) {
  return getFileByPathArray(path.split("/"), project);
}

export function getFileByPathArray(pathArray, project) {
  const _acc = { contents: [project] };

  return pathArray.reduce((acc, p) => {
    if (acc && acc.contents && acc.contents.length) {
      const match = acc.contents.filter(i => i.name === p);
      return (match.length) ? match[0] : null;
    } else {
      return null;
    }
  }, _acc);
}
