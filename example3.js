function parseINIFileSimple(text) {
  const lines = text.split("\n");
  const result = {};
  for (const line of lines) {
    const [key, value] = line.split("=", 2);
    result[key.trim()] = value.trim();
  }
  return result;
}
