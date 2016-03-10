export function getFileByPath(path, project) {
  return path.split("/").reduce((acc, p) => {
    if (acc && acc.contents && acc.contents.length) {
      const match = acc.contents.filter(i => i.name === p);
      return (match.length) ? match[0] : null;
    }
  });
}
