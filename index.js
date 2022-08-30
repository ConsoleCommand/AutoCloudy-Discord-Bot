const express = require("express");
const app = express();
const http = require("http");

const { Client, Collection } = require("discord.js");
const { token } = require("./ayarlar.json");
const bot = new Client();

["aliases", "commands"].forEach(x => (bot[x] = new Collection()));
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 120000);

bot.login(token);
