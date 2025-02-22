import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateGeminiStory = async (prompt) => {
    try {
        const output = await model.generateContent(`Please generate a complete story with a clear beginning, middle, and end, and include a moral at the end to teach a child about ${prompt}`);
        return { story: output.response.text() };
    } catch (error) {
        console.error("Error generating story:", error);
        return { error: 'An error occurred while generating the story' };
    }
}