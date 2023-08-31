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
/** This a test of the implement-missing-function codefix
 * 
 * It asks copilot to provide an implementation of findFollowersExcept.
 */
const testSubscribers: Subscriber[] = []
const channel: Channel = {
  id: 11001,
  name: "TypeScript",
  url: new URL("https://www.youtube.com/channel/TYPESCRIPT_URL"),
  subscribers: testSubscribers
}
showEarliestSubscriber(findMatchingFollowers(channel, testSubscribers));

/** This is a test of suggesting names for just-generated parameter names
 * (It only works one-at-a-time currently, and desn't pop a rename interface)
 */
type ChannelConstructor = (number, string, URL) => Channel
