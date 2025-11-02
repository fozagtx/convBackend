import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { runAgent } from "../chat/agents/ai";
import { requireAuth } from "./middleware";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.use("/api/auth", toNodeHandler(auth));

app.use(express.json());

app.post("/api/agent", requireAuth, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await runAgent(prompt);
    const user = (req as any).user;

    res.json({
      response,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
