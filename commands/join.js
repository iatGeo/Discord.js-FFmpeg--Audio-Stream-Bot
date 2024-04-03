import { SlashCommandBuilder } from "discord.js";
import {
   joinVoiceChannel,
   createAudioPlayer,
   createAudioResource,
   getVoiceConnection,
} from "@discordjs/voice";

// Create an AudioPlayer instance
const player = createAudioPlayer();

// Command Builder export
export const data = new SlashCommandBuilder()
   .setName("join")
   .setDescription(`Ready to serve your audio`);

// Execute function export
export async function execute(interaction) {
   // Join the same voice channel as the user who issued the command
   const channel = interaction.member?.voice.channel;
   if (channel) {
      // Disconnect any existing voice connections
      const existingConnection = getVoiceConnection(channel.guild.id);
      if (existingConnection) {
         existingConnection.destroy();
      }

      // Join the new voice channel
      const connection = joinVoiceChannel({
         channelId: channel.id,
         guildId: channel.guild.id,
         adapterCreator: channel.guild.voiceAdapterCreator,
      });

      // Create an AudioResource from the RTP source
      const resource = createAudioResource("rtp://127.0.0.1:1234");

      // Play the audio on the voice channel
      player.play(resource);

      // Subscribe the connection to the player
      connection.subscribe(player);

      await interaction.reply(
         "Streaming your audio source to the voice channel"
      );
   } else {
      await interaction.reply("You need to join a voice channel first!");
   }
}
