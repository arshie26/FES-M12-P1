import express from "express";
import { MODEL, ai } from "../gemini.js";

const router = express.Router();

const PROMPT = `You are a trivia game hint writer.
Give one short, useful clue that nudges the player toward answering the question.
Never state or reveal the answer. Do not give away the answer directly.
Reply with only the hint, with no preamble or label.`;

router.post("/", async (req, res) => {
  const { question } = req.body ?? {};
  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input: `Question: ${question.trim()}`,
      system_instruction: PROMPT,
      generation_config: { temperature: 0.7 },
      response_format: { type: "text", mime_type: "application/json"}
    });

    const hint = interaction.output_text?.trim();
    if (!hint) {
      return res.status(502).json({ error: "Could not generate a hint" });
    }

    res.json({ hint });
  } catch (error) {
    console.error("Error in /hint route:", error);
    res.status(500).json({ error: "Could not generate a hint" });
  }
});

export default router;
