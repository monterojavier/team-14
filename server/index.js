"use strict";
const Groq = require("groq-sdk");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function main(prompt, learningStyle) {
  const chatCompletion = await getGroqChatCompletion(prompt, learningStyle);
  return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(prompt, learningStyle) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
          ${prompt}

          My preferred learning styles are: ${learningStyle}

          Return the resources most applicable
          `,
      },
    ],
    model: "llama3-70b-8192",
  });
}

app.get("/api", async (req, res) => {
  try {
    const { prompt, learningStyle } = req.query;
    const groqAnswer = await main(prompt, learningStyle);
    const message = `${groqAnswer}`;
    res.json({ message: message });
  } catch (error) {
    console.error("Error occurred while processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = {
  main,
  getGroqChatCompletion,
};
