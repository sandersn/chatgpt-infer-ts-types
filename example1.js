function parseLogsFromCsv(text) {
    return text.split('\n').map(line => {
        const [timestamp, level, message] = line.split(',');
        return { timestamp, level, message };
    })
}