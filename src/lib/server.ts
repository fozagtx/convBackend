import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { runAgent } from "../chat/agents/ai";

const app = express();
const port = 8000;

app.all("/api/auth/*", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

// AI Agent endpoint
app.post("/api/agent", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await runAgent(prompt);

    res.json({ response });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
