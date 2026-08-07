import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
const PORT = 3000;

// In-memory data store for RSVPs and Guestbook Wishes
const rsvps: Array<{
  id: string;
  guestName: string;
  email?: string;
  attending: boolean;
  adultsCount: number;
  kidsCount: number;
  dietary?: string;
  specialNote?: string;
  submittedAt: string;
}> = [
  {
    id: "sample-1",
    guestName: "Auntie Eleanor & Uncle Arthur",
    attending: true,
    adultsCount: 2,
    kidsCount: 1,
    dietary: "Vegetarian option preferred",
    specialNote: "Cannot wait to celebrate Little Princess Sierra & King Roy!",
    submittedAt: new Date().toISOString(),
  }
];

const wishes: Array<{
  id: string;
  author: string;
  message: string;
  avatarIcon?: string;
  createdAt: string;
}> = [];

// Lazy Gemini API client initializer
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get("/api/rsvps", (req, res) => {
  res.json({ success: true, rsvps });
});

app.post("/api/rsvps", (req, res) => {
  const { guestName, email, attending, adultsCount, kidsCount, dietary, specialNote } = req.body;
  if (!guestName) {
    return res.status(400).json({ error: "Guest name is required" });
  }

  const newRsvp = {
    id: `rsvp-${Date.now()}`,
    guestName,
    email: email || "",
    attending: Boolean(attending),
    adultsCount: Number(adultsCount) || 1,
    kidsCount: Number(kidsCount) || 0,
    dietary: dietary || "",
    specialNote: specialNote || "",
    submittedAt: new Date().toISOString()
  };

  rsvps.push(newRsvp);
  res.json({ success: true, rsvp: newRsvp });
});

app.get("/api/wishes", (req, res) => {
  res.json({ success: true, wishes });
});

app.post("/api/wishes", (req, res) => {
  const { author, message, avatarIcon } = req.body;
  if (!author || !message) {
    return res.status(400).json({ error: "Author and message are required" });
  }

  const newWish = {
    id: `wish-${Date.now()}`,
    author,
    message,
    avatarIcon: avatarIcon || "✨",
    createdAt: new Date().toISOString()
  };

  wishes.push(newWish);
  res.json({ success: true, wish: newWish });
});

app.post("/api/generate-wish", async (req, res) => {
  try {
    const { guestName, relation, tone } = req.body;
    const ai = getGenAIClient();

    if (!ai) {
      // Fallback fairytale templates if API key is not configured
      const fallbacks = [
        `May magical pixie dust follow sweet Little Sierra on her 1st birthday, and may King Roy's kingdom shine brightest on his 36th year! Warmest wishes from ${guestName || 'a dear guest'}!`,
        `By royal decree, wishing Sierra a fairytale 1st birthday filled with magic and mushrooms, and Roy a regal 36th year full of triumph and joy! With love from ${guestName || 'a family friend'}.`,
        `Sending fairy wings and golden crown blessings to baby Sierra for turning 1, and royal cheers to King Roy for turning 36! Excited to celebrate with you at Spice in Valley!`
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      return res.json({ wish: randomFallback });
    }

    const prompt = `Write a short, heart-warming, fairytale-themed birthday blessing message (2-3 sentences max) for a joint birthday party:
- Sierra (daughter turning 1 year old) - Fairy / Princess theme
- Roy (father/husband turning 36 years old) - Royal King theme
From guest: "${guestName || 'A Loving Guest'}" (Relation: ${relation || 'Friend/Family'}).
Use magical fairy dust, royal kingdom, crown, and floral theme keywords! Tone should be ${tone || 'sweet & enchanting'}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const wishText = response.text || "May your fairytale double birthday be filled with endless magic, royal joy, and sweet memories!";
    res.json({ wish: wishText });
  } catch (err: any) {
    console.error("Gemini API wish generation error:", err);
    res.status(500).json({ error: "Could not generate wish. Please try writing your own!" });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fairytale Server running on http://localhost:${PORT}`);
  });
}

startServer();
