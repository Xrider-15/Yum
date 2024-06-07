import { Client } from "revolt.js";
import { token, prefix } from './config.js';

// Create a new client instance
let client = new Client();

// Once your client is ready, this code will be executed (only once)
client.on("ready", async () => {
    if (!client.user) return;

    console.info(`Logged in as ${client.user.username}!`); // This returns "Logged in as *Your bot's name*!" in the console
    client.api.patch("/users/@me", { status: { text: "!help for all the commands", presence: "Focus" } });
});

// Make the client (bot) send the "Pong!" message after you send a message with the content "!ping" into chat.
client.on("message", async (message) => {
    if (message.content === prefix + "pong") {
        message.reply("Ping!");
    }
    if (message.content === prefix + "foo") {
        message.reply("bar");
    } 
    /*if (message.content === prefix + "reply") {
        message.channel.sendMessage("I replied!");
    }*/
    if (message.content === prefix + "react") {
        message.react(encodeURIComponent("❤️"));    
    }
    if (message.content === prefix + 'ping') {
        if (!message.channel || !client.websocket.ping) return;

        let now = Date.now();
        const msg = await message.channel.sendMessage(`Pinging...`)
        await msg.edit({ content: `The bots latency is: ${Date.now() - now}ms\nThe APIs Latency is: ${Math.round(client.websocket.ping)}ms`})
    }
    if (message.content === prefix + "help") {
        message.reply("!pong\n !foo\n !react\n !ping\n !hello");
    }
    if (message.content === prefix + "hello") {
        message.reply("Hello, world! \n Nice to meet you.");
    }
});

// Log in to Revolt with your client's token
client.loginBot(token);