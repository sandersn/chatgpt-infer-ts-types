function parseLogsFromCsv1(text) {
    return text.split('\n').map(line => {
        const [timestamp, level, message] = line.split(',');
        return { timestamp, level, message };
    })
}
function parseLogsFromCsv2(text) {
    const lines = text.split('\n');
    const logs = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const [timestamp, level, message] = line.split(',');
        logs.push({ timestamp, level, message });
    }
    return logs;
}
function parseINIFileSimple(text) {
    const lines = text.split('\n');
    const result = {};
    for (const line of lines) {
        const [key, value] = line.split("=", 2);
        result[key.trim()] = value.trim();
    }
    return result;
}
function parseINIFileComplex(text) {
    const lines = text.split('\n');
    const result = {};
    let section = result;
    lines.forEach(line => {
        const match = line.match(/^\[(.*)\]$/);
        if (match) {
            section = result[match[1]] = {};
        }
        else {
            const [key, value] = line.split('=', 2);
            section[key.trim()] = value.trim();
        }
    });
    return result;
}
