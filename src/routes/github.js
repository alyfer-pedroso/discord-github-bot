import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import { Client, GatewayIntentBits } from "discord.js";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

export const github = express.Router();

// github webhook endpoint
github.post("/github", (req, res) => {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  if (event === "pull_request" && payload.action === "opened") {
    const pr = payload.pull_request;
    const message = `🚀 New Pull Request opened by **${pr.user.login}**: ${pr.html_url}`;

    client.channels
      .fetch(CHANNEL_ID)
      .then((channel) => channel.send(message))
      .catch(console.error);
  }

  res.status(200).send("ok");
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);
