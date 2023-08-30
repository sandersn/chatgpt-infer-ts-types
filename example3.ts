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
function bifilter<T>(xs: T[], predicate: (t: T) => boolean): T[][] {
  let yeses = []
  let nos = []
  for (const x of xs) {
    const newLocal = predicate(x);
    if (newLocal) {
      yeses.push(x)
    } else {
      nos.push(x)
    }
  }
  return [yeses, nos]
}

interface Channel {
  id: number
  name: string
  url: URL
  subscribers: Subscriber[]
}
interface Subscriber {
  id: number
  name: string
  email: string
  follows: Channel[]
}
/** this is a test of the extract function refactor 
 * 
 * Finds the subscriber with the earliest id.
 * Then it transforms that to a formatted list.
 */
function showEarliestSubscriber(subs: Subscriber[]) {
  let earliest = subs[0]
  let earliestId = Number.MAX_SAFE_INTEGER
  for (const sub of subs) {
    if (sub.id < earliestId) {
      earliest = sub
      earliestId = sub.id
    }
  }
  let formatted = `${earliest.name} <${earliest.email}>`
  for (const follow of earliest.follows) {
    formatted += `\n- ${follow.name} (${follow.url})`
  }
  return formatted
}
function extractLocal() {

}
class ExtractLocal() {
  extractLocal() {

  }
}
function extractTypeAlias() {

}
function extractInterface() {

}
function nameInferredReturnType() {

}
type NameDefaultedParameters = (string, string) => [string, string]
implementMissingFunction(extractFunction, 101)

abstract class Base {

}
interface Specification {

}
class ImplementAbstractMethod extends Base {

}
class ImplementSpecification implements Specification {

}