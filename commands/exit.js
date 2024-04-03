import { SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";

// Command Builder export
export const data = new SlashCommandBuilder()
   .setName("exit")
   .setDescription(`Leave channel`);

// Execute function export
export async function execute(interaction, client) {
   try {
      // Get the bot's voice connection for the guild
      const botVoiceConnection = getVoiceConnection(interaction.guildId);

      // Check if the bot is in a voice connection
      if (!botVoiceConnection) {
         await interaction.reply("I'm not within a voice channel.");
         return;
      }

      // Disconnect the bot from the voice channel
      botVoiceConnection.destroy();

      // Reply to the interaction
      await interaction.reply("Bye for now, see you around!");
   } catch (error) {
      console.error(
         "An error occurred while executing the 'exit' command:",
         error
      );
      await interaction.reply(
         "An error occurred while leaving the voice channel."
      );
   }
}
