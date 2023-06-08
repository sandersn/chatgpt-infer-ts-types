function parseLogsFromCsv(text) {
  const lines = text.split("\n");
  const logs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [timestamp, level, message] = line.split(",");
    logs.push({ timestamp, level, message });
  }
  return logs;
}
