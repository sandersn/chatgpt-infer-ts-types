import fs from "fs"
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { assert } from "console";
const client = new OpenAIClient(
  "https://devdiv-test-playground.openai.azure.com/",
  new AzureKeyCredential(process.env.OPENAI_API_KEY!),
  { apiVersion: "2023-03-15-preview" }
);
async function main() {
  let content = fs.readFileSync(process.argv[2], 'utf8');
  const ext = process.argv[2].split('.').pop()!;
  if (process.argv[3] && process.argv[4])
    content = content.slice(+process.argv[3], +process.argv[4]);
  const systemPrompt = `
I wrote the following ${ext === 'py' ? "Python" : "Javascript"} code. 
Can you suggest ${ext === 'py' ? "" : "Typescript"} types for it? I'd like standalone interfaces if possible.
Do not change the existing code except to add types.`;
  const result = await client.getChatCompletions(
     "gpt-35",
    // OR
    // "code-davinci-002", (note: doesn't work on the hackathon API key)
    [
      { role: "system", content: systemPrompt },
      { role: "user", content } 
    ], {
      temperature: 1,
      maxTokens: 400,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
      stop: undefined,
    }
  );
  console.log("Received", result.choices.length, "choices")
  assert(result.choices[0].message?.role === "assistant")
  let output = result.choices[0].message?.content
  if (!output) {
    throw new Error("no output")
  }
  const startFence = output.indexOf("```")
  if (startFence > -1) {
    const endFence = output.indexOf("```", startFence + 3)
    console.log("Code fence in output, removing")
    output = output.slice(startFence + 3, endFence === -1 ? undefined : endFence)
  }
  console.log(output)
}
main().catch(err => { 
  console.error(err)
  process.exit(1)
})