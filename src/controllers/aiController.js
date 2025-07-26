// const OpenAI = require('openai');
// require('dotenv').config();



// const openai = new OpenAI( {apiKey: process.env.OPENAI_API_KEY});

// const getAIGuidance = async (req, res) => {
//   const { exerciseName } = req.body;

//   if (!exerciseName) {
//     return res.status(400).json({ error: 'Exercise name is required' });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a fitness coach. Give clear and accurate advice.' },
//         { role: 'user', content: `Give form and technique guidance for ${exerciseName}.` },
//       ],
//     });

//     const aiText = response.data.choices[0].message.content;
//     res.json({ message: aiText });
//   } catch (error) {
//     console.error('AI Error:', error.message);
//     res.status(500).json({ error: 'AI guidance failed' });
//   }
// };

// module.exports = { getAIGuidance };
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiAIResponse = async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.status(200).json({ message: response });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};

module.exports = { getGeminiAIResponse };
