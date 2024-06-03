import { MatrixClient, SimpleFsStorageProvider, AutojoinRoomsMixin, } from "matrix-bot-sdk";
const homeserverUrl = "https://chat.soziale.cloud";
const accessToken = "syt_eXVt_OjKPptTMfHjfRkGnPOwo_1ZP35p";
const storage = new SimpleFsStorageProvider("store.json");
const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);
// Before we start the bot, register our command handler
client.on("room.message", handleCommand);
// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then(() => console.log("Bot started!"));
// This is the command handler we registered a few lines up
async function handleCommand(roomId, event) {
    // Don't handle unhelpful events (ones that aren't text messages, are redacted, or sent by us)
    if (event['content']?.['msgtype'] !== 'm.text')
        return;
    if (event['sender'] === await client.getUserId())
        return;
    // Check to ensure that the `!hello` command is being run
    const body = event['content']['body'];
    if (!body?.startsWith("!hello"))
        return;
    // Now that we've passed all the checks, we can actually act upon the command
    await client.replyNotice(roomId, event, "Hello world!");
}
