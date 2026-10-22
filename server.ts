import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini client utility
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint for AI Scent Alchemy
app.post('/api/gemini/scent-alchemy', async (req, res) => {
  const { intention, zodiacSign } = req.body;

  if (!intention) {
    return res.status(400).json({ error: 'Intention is required' });
  }

  if (!ai) {
    // Return structured astrologer response if no API key is provided
    return res.json({
      bespokeRecipe: `The Cosmic Alchemist attunes to your ${zodiacSign || 'zodiac'} aura. We harmonize rare Sicilian bergamot and Kashmiri saffron with sacred frankincense and creamy Mysore sandalwood to ground and elevate your spirit.`,
      astrologicalInsight: `Celestial transits favor bold heart opening and centered sovereignty. Your intention resonates with the solar and Venusian spheres.`,
      accordBlend: [
        'Top: Sun-drenched Bergamot & Saffron Stigmas',
        'Heart: Damascus Rose & Oman Frankincense',
        'Base: Mysore Sandalwood & Golden Amber',
      ],
      planetaryTiming: 'Anoint during the planetary hour of the Sun or Venus at dawn or dusk.',
      mantra: 'Om Suryaya Namaha · As Above, So Within',
    });
  }

  try {
    const prompt = `You are the master celestial perfumer and alchemist for Astroscent Cosmik, a luxury haute perfumery that blends ancient astrology, sacred botanicals, and cosmic planetary light.
A client has provided their zodiac sign: "${zodiacSign || 'Universal'}" and their intention or life situation: "${intention}".

Generate a bespoke astrological perfume formula and sacred ritual in JSON with the exact following schema:
- bespokeRecipe: A poetic, evocative 2-3 sentence description of their custom fragrance formulation and why these notes were chosen for them.
- astrologicalInsight: A 1-2 sentence astrological perspective on their intention based on their planetary rulers and energetic current.
- accordBlend: Array of exactly 3 strings representing the Olfactory Pyramid (e.g. ["Top: ...", "Heart: ...", "Base: ..."]).
- planetaryTiming: The best planetary hour or day to apply the elixir for maximum manifestation.
- mantra: A sacred Sanskrit planetary mantra with an English translation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bespokeRecipe: { type: Type.STRING },
            astrologicalInsight: { type: Type.STRING },
            accordBlend: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            planetaryTiming: { type: Type.STRING },
            mantra: { type: Type.STRING },
          },
          required: [
            'bespokeRecipe',
            'astrologicalInsight',
            'accordBlend',
            'planetaryTiming',
            'mantra',
          ],
        },
      },
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text);
      return res.json(data);
    } else {
      throw new Error('Empty response from model');
    }
  } catch (err) {
    console.error('Error generating scent alchemy:', err);
    return res.status(500).json({
      error: 'Failed to synthesize celestial perfume recipe. Please try again.',
    });
  }
});

// Full-stack Vite setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Astroscent Cosmik server running on port ${port}`);
  });
}

startServer();
