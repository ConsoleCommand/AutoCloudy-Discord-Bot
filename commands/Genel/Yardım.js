const Discord = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const { Acloudy } = require("../../renk.json");

module.exports = {
  config: {
    name: "yardım",
    aliases: ["y", "yardim", "komut", "komutlar"],
    usage: "Bunu Anlatmama Cidden Gerek Varmı ?",
    category: "Genel",
    description: "Botun Sahip Olduğu Tüm Komutları Gösterir",
    accessableby: "Üyeler"
  },
  run: async (bot, message, args) => {
    let Embed = new Discord.RichEmbed()
      .setColor(Acloudy)
      .setAuthor(`${bot.user.username} Yardım / Komutlar`)
      .setThumbnail(bot.user.displayAvatarURL);

    if (!args[0]) {
      const categories = readdirSync("./commands/");

      Embed.setDescription(
        `Bunlar ${bot.user.username}'nin Sahip Olduğu Tüm Komutlardır.'\nPrefix: **-**`
      );
      Embed.setFooter(
        `© ${bot.user.username} | Toplam Komut Sayısı: ${bot.commands.size}`,
        bot.user.displayAvatarURL
      );

      categories.forEach(category => {
        const dir = bot.commands.filter(c => c.config.category === category);
        const capitalise =
          category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          Embed.addField(
            `❯ ${capitalise} [${dir.size}]:`,
            dir.map(c => `\`${c.config.name}\``).join(" ")
          );
        } catch (e) {
          console.log(e);
        }
      });

      return message.channel.send(Embed);
    } else {
      let command = bot.commands.get(
        bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );
      if (!command)
        return message.channel.send(
          Embed.setTitle("Geçersiz Komut").setDescription(
            `Komut Listesi İçin Lütfen \`-yardım\` Kullanın`
          )
        );
      command = command.config;

      Embed.setDescription(stripIndents`Prefix: \`-\`\n
            **Komut:** ${command.name.slice(0, 1).toUpperCase() +
              command.name.slice(1)}
            **Açıklama:** ${command.description || "Açıklaması Yok"}
            **Kullanışı:** ${
              command.usage ? `\` ${command.usage}\`` : "Kullanışı Yok"
            }
            **Kimler Erişebilir:** ${command.accessableby || "Üyeler"}
            **Yan Komutları:** ${
              command.aliases ? command.aliases.join(", ") : "Yan Komutları Yok"
            }`);

      return message.channel.send(Embed);
    }
  }
};
