require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testV1() {
  try {
    console.log("Testando com apiVersion: 'v1'...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
    const result = await model.generateContent("Oi");
    console.log("SUCESSO com v1:", result.response.text());
  } catch (err) {
    console.error("FALHA com v1:", err.message);
  }
}

testV1();
