import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro-002",
      contents: `${SUMMARY_SYSTEM_PROMPT}\n\n${pdfText}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });
    if (!response.text) {
      throw new Error("Empty Response from Gemini");
    }
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error", error);
    throw error;
  }
}
