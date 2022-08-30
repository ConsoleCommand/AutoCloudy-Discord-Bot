const Discord = require("discord.js");
const { Acloudy } = require("../../renk.json");

module.exports = {
  config: {
    name: "ping",
    description: "api & bot Gecikmesini Ölçer",
    usage: "-ping",
    category: "Genel",
    accessableby: "Üyeler"
  },
  run: async (bot, message, args) => {
    let m = await message.channel.send("Ölçülüyor...");
    let Embed = new Discord.RichEmbed()
      .setColor(Acloudy)
      .setFooter(
        "Bot `" +
          `${m.createdTimestamp - message.createdTimestamp}` +
          "ms`" +
          " ||  API `" +
          `${bot.ping}` +
          "ms`",
        bot.user.displayAvatarURL
      );
    m.edit(Embed);
  }
};
