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
  if (process.argv[3] && process.argv[4])
    content = content.slice(+process.argv[3], +process.argv[4]);
  // TODO:
  // 1. request labelling of new types versus editted code
  // 2. request no other changes to code
  const systemPrompt = `
I wrote the following Javascript code. 
Can you suggest Typescript types for it? I'd like standalone interfaces if possible.
Do not change the existing code except to add types.`;
  const result = await client.getChatCompletions(
    "gpt-35",
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
  console.log(result.choices[0].message?.content)
}
main().catch(err => { 
  console.error(err)
  process.exit(1)
})