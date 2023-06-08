# chatgpt-infer-ts-types

Use ChatGPT to infer Typescript types from Javascript code

People converting from Javascript to Typescript end up with a lot of `any` types, many of them implicit.
They don't get much value from the Typescript conversion.
Even after they add annotation for primitive types like `string` and `number[]`, they need to create interfaces to capture their complex data.
This is a difficult step for people who have never created a type before &mdash; their knowledge of types is implicit.
Fortunately, ChatGPT is **really** good at working with Typescript types, and inferring them from various kinds of input.

## Prototype

The initial prototype doesn't rely on API calls because I don't have access to those yet.
Here's the process:

1. Produce a query using a script:

```sh
$ node query.js ~/src/example/test.js 0 100
```

The numeric parameters specify the start and end locations of the file to use.
If they're left off the whole file is provided.

This prints a query like this:

    I wrote the following Javascript code:
    
    ```
    function parseLogsFromCsv(text) {
        const lines = text.split('\n');
        const logs = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const [timestamp, level, message] = line.split(',');
            logs.push({ timestamp, level, message });
        }
        return logs;
    }
    ```
    
    Can you suggest Typescript types for it? I'd like standalone interfaces if possible.

2. Paste the query into ChatGPT and copy the result into a file.

3. Pass the new file into a second script:

``` sh
$ node parse.js ~/src/example/output.txt
```

This prints a JSON object that contains the newly-defined interfaces as well as the existing code with type annotations added:

``` ts
// new types:
interface Log {
    timestamp: string;
    level: string;
    message: string;
}
// updated code (though only four lines change):
function parseLogsFromCsv(text: string): Log[] {
    const lines: string[] = text.split('\n');
    const logs: Log[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line: string = lines[i];
        const [timestamp, level, message]: string[] = line.split(',');
        logs.push({ timestamp, level, message });
    }
    return logs;
}
```

## Future Work

After the manual prototype, the next step is to use the ChatGPT API to package the above process in a single script.
After that, I intend to integrate the feature into VSCode's Copilot.
This will make it available as a single command in VSCode which uses the current selection to specify which code to annotate.
It will also let VSCode suggest the command when a file is renamed from .js to .ts extensions.
And it will let people have a conversation with ChatGPT to refine the generated code.

