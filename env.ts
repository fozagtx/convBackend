import { z } from "zod";
import { safeParse } from "zod/mini";

export const envSchema = z.object({
  FIRECRAWL_API_KEY: z.string().min(1, "Firecrwl api key must be set"),
  DATABASE_URL: z.string().url("DATABASER URL IS NOT SET"),
  BETTER_AUTH_URL: z.string().url("BETTER AUTH URL MUST BE SET"),
  BETTER_AUTH_SECRET: z.number().min(1, "BETTER AUTH SECRET SHOUL;D BE SET"),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
