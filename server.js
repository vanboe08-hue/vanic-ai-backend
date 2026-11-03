const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("VANIC-AI Backend is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Tafadhali andika ujumbe."
      });
    }

    if (message.length > 4000) {
      return res.status(400).json({
        error: "Ujumbe ni mrefu sana."
      });
    }

    const response = await ai.responses.create({
      model: "gpt-5.5",
      instructions: "You are VANIC-AI, a helpful assistant. Respond in Swahili or English depending on the user's language.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({
      error: "VANIC-AI imeshindwa kujibu. Jaribu tena."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("VANIC-AI server running on port " + PORT);
});
