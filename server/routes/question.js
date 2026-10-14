import express from "express";
import { MODEL, ai } from "../gemini.js";

const router = express.Router();

const PROMPT = `You are a trivia question writer.
Given a topic, write ONE fun multiple-choice question about it.
Reply as JSON with this exact shape:
{ "question": string, "options": [string, string, string, string], "answer": string }
The "answer" must be exactly one of the four options. No preamble, no markdown.
`;

router.post("/", async (req, res) => {
  const { topic } = req.body;

  const interaction = await ai.interactions.create({
    model: MODEL,
    input: `Topic: ${topic}`,
    system_instruction: PROMPT,
    generation_config: { temperature: 0.9 },
  });

  console.log(interaction.output_text);

  const quiz = JSON.parse(interaction.output_text);
  res.json(quiz);
});

export default router;
