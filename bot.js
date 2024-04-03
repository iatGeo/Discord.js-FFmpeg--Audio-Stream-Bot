import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import * as joinCommand from "./commands/join.js";
import * as exitCommand from "./commands/exit.js";

config();

// Create a new client instance
const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
   ],
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);

// When the client is ready
client.once(Events.ClientReady, () => {
   console.log("Up and running");
});

// Execute-function beign called from the play command
client.on(Events.InteractionCreate, handleInteraction);

async function handleInteraction(interaction) {
   if (!interaction.isCommand()) return;

   try {
      // Check the command name and call the corresponding execute function
      if (interaction.commandName === "join") {
         await joinCommand.execute(interaction);
      } else if (interaction.commandName === "exit") {
         await exitCommand.execute(interaction);
      }
   } catch (error) {
      console.error("An error occurred while handling the interaction:", error);
      await interaction.reply("An error occurred while executing the command.");
   }
}
