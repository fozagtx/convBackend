import { tool } from "ai";
import { z } from "zod";
import FirecrawlApp from "@mendable/firecrawl-js";

let firecrawl: FirecrawlApp | null = null;

function getFirecrawl() {
  if (!firecrawl) {
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new Error("FIRECRAWL_API_KEY environment variable is required");
    }
    firecrawl = new FirecrawlApp({
      apiKey: process.env.FIRECRAWL_API_KEY,
    });
  }
  return firecrawl;
}

export const firecrawlTool = tool({
  description: "Scrape and analyze website content for optimization",
  parameters: z.object({
    url: z.string().describe("The URL of the website to scrape"),
  }),
  execute: async ({ url }: { url: string }) => {
    try {
      const firecrawlInstance = getFirecrawl();
      const result = await firecrawlInstance.scrapeUrl(url, {
        formats: ["markdown", "html"],
      });
      return {
        success: true,
        content: result.markdown,
        html: result.html,
        metadata: result.metadata,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
});
