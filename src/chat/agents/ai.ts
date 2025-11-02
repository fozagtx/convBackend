import { generateText, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { firecrawlTool } from "../tools/crawlTool";

export async function runAgent(userPrompt: string) {
  const { text, toolCalls, toolResults } = await generateText({
    model: google("gemini-2.5-flash"),
    system:
      "you are a 20x ghostwriting and landing page optimiser agent that can use the firecrawl tool to scrape and optimize website by giving feedback loops. When asked about a website, use the firecrawl tool to scrape it first, then provide detailed analysis and optimization recommendations based on conversion best practices.",
    prompt: userPrompt,
    tools: {
      firecrawl: firecrawlTool,
    },
    stopWhen: stepCountIs(5),
  });

  return {
    response: text,
    toolCalls: toolCalls,
    toolResults: toolResults,
  };
}
