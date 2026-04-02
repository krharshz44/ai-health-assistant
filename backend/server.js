const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// System Prompt
const SYSTEM_PROMPT = `You are a health assistant specifically designed for college hostel students in India.
Your role is to help students with health concerns, keeping in mind their practical constraints.

Context about hostel students:
- They have a tight budget (₹0–₹500 for remedies)
- They rely on mess food which may cause issues like acidity, food poisoning, etc.
- They may not always have access to a doctor immediately
- Pharmacies and general stores are usually nearby
- Common issues: fever, cold, stomach problems, headaches, dehydration, stress

IMPORTANT: You MUST respond ONLY with valid JSON in this exact format, no extra text, no markdown, no code blocks:
{
  "possibleIssue": "Brief name/description of the likely health issue",
  "urgencyLevel": "LOW" or "MEDIUM" or "HIGH",
  "urgencyReason": "One sentence explaining why this urgency level",
  "whatToDo": ["Step 1 action", "Step 2 action", "Step 3 action"],
  "whatToAvoid": ["Thing to avoid 1", "Thing to avoid 2"],
  "whenToSeeDoctor": "Clear instruction on when they must visit a doctor",
  "budgetRemedy": "Specific affordable remedy under ₹200 if applicable, else null",
  "messFood": "Specific mess food advice (what to eat or avoid from mess), or null if not relevant"
}

Urgency levels:
- LOW: Minor issue, home remedies will work fine
- MEDIUM: Needs attention and OTC medicine, monitor carefully
- HIGH: Requires medical attention soon, could be serious

Always be practical, empathetic, and specific to the hostel student context.`;

// POST /api/symptom
app.post("/api/symptom", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    // Validate input
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Please provide a valid symptom description." });
    }
    if (message.trim().length < 3) {
      return res.status(400).json({ error: "Please describe your symptoms in more detail." });
    }

    // Build messages array for Groq (OpenAI-compatible format)
    const messages = [{ role: "system", content: SYSTEM_PROMPT }];

    if (chatHistory && Array.isArray(chatHistory)) {
      const recentHistory = chatHistory.slice(-6);
      recentHistory.forEach((msg) => {
        if (msg.role === "user") {
          messages.push({ role: "user", content: msg.content });
        } else if (msg.role === "assistant") {
          messages.push({ role: "assistant", content: msg.content });
        }
      });
    }

    messages.push({ role: "user", content: message.trim() });

    // Call Groq API
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!groqRes.ok) {
      const errData = await groqRes.json();
      console.error("Groq API error:", errData);

      if (groqRes.status === 401) {
        return res.status(500).json({ error: "Invalid Groq API key. Check your .env file." });
      }
      if (groqRes.status === 429) {
        return res.status(429).json({ error: "Too many requests. Wait a moment and try again." });
      }
      return res.status(500).json({ error: "Groq API error. Please try again." });
    }

    const groqData = await groqRes.json();
    const rawResponse = groqData.choices?.[0]?.message?.content;

    if (!rawResponse) {
      return res.status(500).json({ error: "Empty response from Groq. Please try again." });
    }

    // Parse JSON — strip markdown code fences if present
    let parsedResponse;
    try {
      const cleaned = rawResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      parsedResponse = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response:", rawResponse);
      return res.status(500).json({ error: "AI returned unexpected format. Please try again." });
    }

    // Validate required fields
    const requiredFields = ["possibleIssue", "urgencyLevel", "whatToDo", "whatToAvoid", "whenToSeeDoctor"];
    for (const field of requiredFields) {
      if (!parsedResponse[field]) {
        return res.status(500).json({ error: "Incomplete AI response. Please try again." });
      }
    }

    return res.status(200).json({ response: parsedResponse });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

//Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "HostelMed backend running with Groq (Llama 3.3)" });
});

//Start Server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
  console.log(` Using: Groq — Llama 3.3 70B (free tier)`);
  console.log(` POST /api/symptom — ready`);
});