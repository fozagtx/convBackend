import { tool } from "ai";
import { z } from "zod";
import Firecrawl from "@mendable/firecrawl-js";

let firecrawl: Firecrawl | null = null;

function getFirecrawl() {
  if (!firecrawl) {
    if (!process.env.FIRECRAWL_API_KEY) {
      throw new Error("FIRECRAWL_API_KEY environment variable is required");
    }
    firecrawl = new Firecrawl({
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
  // @ts-expect-error - tool execute function signature mismatch in ai SDK
  execute: async (params: { url: string }) => {
    try {
      const firecrawlInstance = getFirecrawl();
      const result = await firecrawlInstance.scrape(params.url, {
        formats: ["markdown", "html"],
      });
      return {
        success: true,
        content: result.markdown || "",
        html: result.html || "",
        metadata: result.metadata || {},
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
});
