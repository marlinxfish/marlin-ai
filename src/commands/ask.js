import { EmbedBuilder } from "discord.js";
import groqService from "../services/groqService.js";

const askCommand = async (message, content) => {
  const thinkingEmoji = "🤔";
  const loadingMessage = await message.reply(`${thinkingEmoji} Sedang mencari jawaban...`);

  const answer = await groqService(content);

  const embed = new EmbedBuilder().setColor("#0099ff").setTitle("💡 Jawaban dari Marlin AI").setDescription(`📘 **Pertanyaan:**\n${content}\n\n📝 **Jawaban:**\n${answer}`).setFooter({ text: "Marlin AI", iconURL: message.client.user.displayAvatarURL() }).setTimestamp();

  await loadingMessage.edit({ content: null, embeds: [embed] });
};

export default askCommand;
