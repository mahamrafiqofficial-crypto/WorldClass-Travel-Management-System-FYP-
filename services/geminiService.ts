import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize safe API handling. If no key, we will handle gracefully in UI.
const ai = new GoogleGenAI({ apiKey });

export const generateText = async (prompt: string, context?: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return "API Key is missing. Please check your environment configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const finalPrompt = `
      Context: You are an AI assistant for a travel agency website named "WorldClass".
      Task: ${prompt}
      ${context ? `Additional Info: ${context}` : ''}
      Tone: Professional, inspiring, and inviting.
      Format: Plain text, ready to paste into a website.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: finalPrompt,
    });

    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const generateBlogPost = async (topic: string): Promise<{ title: string; content: string; excerpt: string }> => {
   if (!apiKey) return { title: "Error", content: "Missing API Key", excerpt: "Missing API Key" };

   try {
     const model = 'gemini-2.5-flash';
     const prompt = `Write a travel blog post about "${topic}". Return ONLY a JSON object with keys: "title", "excerpt" (max 20 words), and "content" (html format, about 300 words).`;
     
     const response = await ai.models.generateContent({
       model,
       contents: prompt,
       config: {
         responseMimeType: 'application/json'
       }
     });

     const text = response.text;
     if (!text) throw new Error("No text returned");
     return JSON.parse(text);
   } catch (e) {
     console.error(e);
     return { title: "Generation Failed", content: "Please try again.", excerpt: "Error" };
   }
}
