import { Client, GatewayIntentBits } from "discord.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";
import askCommand from "./commands/ask.js";
import figlet from "figlet";
import chalk from "chalk";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.clear();
  console.log(chalk.cyan(figlet.textSync("Marlin AI")));
  logger.success(`Bot ${client.user.tag} sudah online!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const mentionRegex = new RegExp(`^<@!?${client.user.id}>`);
  if (mentionRegex.test(message.content)) {
    const content = message.content.replace(mentionRegex, "").trim();
    if (content) {
      logger.info(`Pertanyaan diterima: ${content}`);
      await askCommand(message, content);
    } else {
      message.reply(" Ada yang ingin kamu tanyakan❓");
    }
  }
});

client.login(config.discordToken);
