
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// IMPORTANT: This application expects the Gemini API Key to be available as `process.env.API_KEY`.
// In a typical frontend setup (e.g., Create React App, Vite), you would use a prefixed variable
// like `process.env.REACT_APP_GEMINI_API_KEY` or `import.meta.env.VITE_GEMINI_API_KEY`
// and ensure your build process makes it available.
// For this exercise, we strictly follow the `process.env.API_KEY` instruction.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI. Ensure API_KEY is valid:", error);
    // ai remains null, features will be degraded or mocked.
  }
} else {
  console.warn(
    "Gemini API key (process.env.API_KEY) not found. AI features will be disabled or use mock data. " +
    "Ensure API_KEY is set in your execution environment."
  );
}

export const getAISummary = async (submissionText: string): Promise<string> => {
  if (!ai) {
    // Fallback or error message if API key is not available or initialization failed
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate delay
    const mockSummary = `AI Summary Feature: API Key not configured or invalid. This is a mock summary. The submission appears to be about: "${submissionText.substring(0, 50)}...". It mentions key elements like [mock_element_1] and [mock_action_item_2].`;
    return mockSummary;
  }

  try {
    const model = 'gemini-2.5-flash-preview-04-17'; // Per guidelines
    const prompt = `Provide a concise, actionable summary for the following field service report text. Highlight key issues and actions taken or required. Maximum 3 sentences:\n\n"${submissionText}"`;

    // For low latency, if this were a game AI or similar. For general tasks, omit thinkingConfig.
    // const config = { thinkingConfig: { thinkingBudget: 0 } }; 
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      // config: config // Uncomment if specific thinking config is needed
    });
    
    const summary = response.text;
    if (!summary) {
        return "AI Summary: Could not generate a summary at this time (empty response).";
    }
    return `AI Summary: ${summary.trim()}`;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Consider more specific error messages based on error type if possible
    return "AI Summary: Error fetching summary from Gemini. Please try again later.";
  }
};
