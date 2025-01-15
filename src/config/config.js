import dotenv from "dotenv";
dotenv.config();

export default {
  discordToken: process.env.DISCORD_TOKEN,
  groqApiKey: process.env.GROQ_API_KEY,
  prefix: process.env.PREFIX || "@marlin-ai",
};
