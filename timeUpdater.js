import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import input from "input";
dotenv.config();

const apiId = parseInt(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;

const stringSession = new StringSession(
  process.env.TELEGRAM_SESSION_STRING || ""
);

async function main() {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
    useWss: true,
    logger: null,
  });

  if (!process.env.TELEGRAM_SESSION_STRING) {
    await client.start({
      phoneNumber: async () => await input.text("Enter your phone number: "),
      password: async () => await input.text("Enter your password: "),
      phoneCode: async () =>
        await input.text("Enter the code sent to your phone: "),
      onError: (error) => {},
    });
    console.log(
      "Save this string session to your .env file as TELEGRAM_SESSION_STRING"
    );
    console.log(client.session.save());
  } else {
    await client.connect();
    await updateLastName(client);
    setInterval(() => updateLastName(client), 60000);
  }
}

async function updateLastName(client) {
  try {
    const me = await client.getMe();
    const firstName = me.firstName;
    const now = new Date();
    const baliTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Makassar" })
    );
    const currentTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Makassar",
    });
    const hour = baliTime.getHours();
    const emoji = hour >= 0 && hour < 7 ? "💤" : "👨‍💻";

    await client.invoke(
      new Api.account.UpdateProfile({
        firstName: firstName,
        lastName: `<${currentTime}> ${emoji}`,
      })
    );
  } catch (error) {
    console.error("Error updating last name:", error);
  }
}

main();
