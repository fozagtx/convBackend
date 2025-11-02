import { tool } from "ai";
import { z } from "zod";
import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export const firecrawlTool = tool({
  description: "Scrape and analyze website content for optimization",
  parameters: z.object({
    url: z.string().describe("The URL of the website to scrape"),
  }),
  execute: async ({ url }: { url: string }) => {
    try {
      const result = await firecrawl.scrapeUrl(url, {
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
