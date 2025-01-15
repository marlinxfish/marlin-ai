import axios from "axios";
import config from "../config/config.js";

const groqService = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "Kamu adalah asisten AI yang selalu menjawab dengan jelas dan informatif dalam bahasa Indonesia.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_completion_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${config.groqApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const remainingRequests = response.headers["x-ratelimit-remaining-requests"];
    const remainingTokens = response.headers["x-ratelimit-remaining-tokens"];

    console.log(`📊 Sisa Permintaan Hari Ini: ${remainingRequests}`);
    console.log(`📊 Sisa Token per Menit: ${remainingTokens}`);

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      const retryMinutes = Math.ceil(retryAfter / 60);
      console.warn(`⚠️ Terlalu banyak permintaan. Coba lagi dalam ${retryMinutes} menit.`);
      return `⚠️ Permintaan terlalu banyak. Silakan coba lagi dalam ${retryMinutes} menit.`;
    }
    console.error("❌ Terjadi kesalahan saat menghubungi Groq:", error.message);
    return "❌ Maaf, terjadi kesalahan saat memproses permintaan.";
  }
};

export default groqService;
