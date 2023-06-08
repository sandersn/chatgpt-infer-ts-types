# chatgpt-infer-ts-types

Use ChatGPT to infer Typescript types from Javascript code

People converting from Javascript to Typescript end up with a lot of `any` types, many of them implicit.
They don't get much value from the Typescript conversion.
Even after they add annotation for primitive types like `string` and `number[]`, they need to create interfaces to capture their complex data.
This is a difficult step for people who have never created a type before &mdash; their knowledge of types is implicit.
Fortunately, ChatGPT is **really** good at working with Typescript types, and inferring them from various kinds of input.

## Prototype

```sh
$ node dist/infer.js ~/src/example/test.js 0 100
```

The numeric parameters specify the start and end locations of the file to use.
If they're left off the whole file is provided.

This prompts ChatGPT like this:

    I wrote the following Javascript code.
    Can you suggest Typescript types for it? I'd like standalone interfaces if possible.
    
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
    
The output is the new code should replace the old code. It contains the newly-defined interfaces as well as the existing code with type annotations added:

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

For Hackathon: 
- [x] Get chatGPT to not modify or improve existing code.
- [ ] Parse out only code, or get chatGPT to return only code.
- [ ] Parse out new code from existing code. (probably not needed)

For later:
I intend to integrate the feature into VSCode's Copilot.
- [ ] This will make it available as a single command in VSCode which uses the current selection to specify which code to annotate.
- [ ] It will also let VSCode suggest the command when a file is renamed from .js to .ts extensions.
- [ ] And it will let people have a conversation with ChatGPT to refine the generated code.

