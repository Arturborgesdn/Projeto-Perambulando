require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function testRobot() {
  try {
    const prompt = "Diga olá";
    const result = await model.generateContent(prompt);
    console.log("ROBOT IA OK:", result.response.text());
  } catch (error) {
    console.error("ROBOT IA FAIL:", error.message);
  }
}

testRobot();
