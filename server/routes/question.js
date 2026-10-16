import express from "express";
import { MODEL, ai } from "../gemini.js"

const router = express.Router();

const PROMPT = `You are a sharp, witty trivia host writing questions for a fast-paced game played by curious adults - fun, not academic. 
Given a topic, write ONE multiple-choice question about it" four options, exactly one correct answer, and include a one-line fun fact about the correct answer.
Keep the question and to a single sentence. Make the three wrong options plausible, not silly.
Avoid trivia so obscure only a specialist would know it.
Reply in JSON with this exact shape, and nothing else:
{ "question": string, "options": [string, string, string, string], "answer": string, "funFact": string }
 The "answer" must be exactly one of the four options. No preamble, no markdown.

 Example - 
 Topic: Space
 {question: "Which planet has the most moons?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter", funFact: "Jupiter's moon Ganymede is larger than Mercury."}
 `;

router.post("/", async (req, res) => {
  const { topic } = req.body;

  const interaction = await ai.interactions.create({
    model: MODEL,
    input: `Topic: ${topic}`,
    system_instruction: PROMPT,
    generation_config: { temperature: 0.9 }
  });

  console.log(interaction.output_text);

  const quiz = JSON.parse(interaction.output_text);
  res.json(quiz);
});

export default router;
