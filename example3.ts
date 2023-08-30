function parseINIFileSimple(text) {
  const lines = text.split("\n");
  const result = {};
  for (const line of lines) {
    const [key, value] = line.split("=", 2);
    result[key.trim()] = value.trim();
  }
  return result;
}

function parseINIFileCorrect(text) {
  const lines = text.split("\n");
  const result = {};
  let section = {};
  for (const line of lines) {
    const match: RegExpMatchArray | null = line.match(/^(\w+)=(.*)$/);
    if (match !== null) {
      const [, key, value] = match;
      section[key] = value;
    } else if (line.match(/^\s*(;.*)?$/)) {
      continue;
    } else if (line.match(/^\[(.*)\]$/)) {
      section = {};
      result[RegExp.$1] = section;
    } else {
      throw new Error(`Line '${line}' is not valid.`);
    }
  }
  return result;
}
interface Person {
  name: string;
}
class C implements Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}