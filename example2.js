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

/**
 * @template T
 * @param {T[]} xs 
 * @param {(t: T) => boolean} yes 
 * @param {(t: T) => boolean} no 
 */
function trifilter(xs, yes, no) {
  let yeses = []
  let nos = []
  let maybes = []
  for (const x of xs) {
    if (yes(x)) {
      yeses.push(x)
    } else if (no(x)) {
      nos.push(x)
    } else {
      maybes.push(x)
    }
  }
  return [yeses, nos, maybes]
}

function extractTypedef() {
  
}