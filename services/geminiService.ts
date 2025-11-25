import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// In a real scenario, this key comes from process.env.API_KEY.
// We assume the environment is set up correctly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash'; 

export interface EcoSwapSuggestion {
  originalAction: string;
  alternatives: {
    title: string;
    description: string;
    impact: string;
  }[];
}

export const getEcoSwaps = async (userInput: string): Promise<EcoSwapSuggestion | null> => {
  try {
    const prompt = `
      You are an expert environmental consultant. The user will provide a daily activity or habit. 
      Your goal is to suggest 3 specific "Eco-Swaps" (alternatives) that reduce carbon footprint.
      
      User Input: "${userInput}"

      Return the response in JSON format strictly matching this schema:
      {
        "originalAction": "Short summary of user input",
        "alternatives": [
          { "title": "Name of swap", "description": "Brief explanation", "impact": "Estimated CO2 savings or benefit" }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalAction: { type: Type.STRING },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as EcoSwapSuggestion;
    }
    return null;

  } catch (error) {
    console.error("Error fetching Eco-Swaps:", error);
    return null;
  }
};
