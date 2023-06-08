function parseINIFileComplex(text) {
  const lines = text.split("\n");
  const result = {};
  let section = result;
  lines.forEach((line) => {
    const match = line.match(/^\[(.*)\]$/);
    if (match) {
      section = result[match[1]] = {};
    } else {
      const [key, value] = line.split("=", 2);
      section[key.trim()] = value.trim();
    }
  });
  return result;
}
