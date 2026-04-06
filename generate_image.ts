import { GoogleGenAI } from "@google/genai";

async function generateCorkTexture() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A high-quality, realistic corkboard texture background. Soft cork material with fine, rough, and detailed grain. Natural light brown and tan colors. Skeuomorphic style, high resolution, seamless texture feel. Realistic macro photography of a cork board. Very fine grain, similar to a bulletin board.',
        },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      console.log(`data:image/png;base64,${part.inlineData.data}`);
    }
  }
}

generateCorkTexture();
