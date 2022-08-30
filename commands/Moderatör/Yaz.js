module.exports = {
  config: {
    name: "Yaz",
    description: "Kanal'a Söylenilen Mesajı Gönderir",
    usage: "-yaz",
    category: "Moderatör",
    accessableby: "Yetkili",
    aliases: ["yaz", "konuş", "anons", "duyuru"]
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
      return message.channel.send("Bu komutu kullanmak için yetkin yok.");

    let argsresult;
    let mChannel = message.mentions.channels.first();

    message.delete();
    if (mChannel) {
      argsresult = args.slice(1).join(" ");
      mChannel.send(argsresult);
    } else {
      argsresult = args.join(" ");
      message.channel.send(argsresult);
    }
  }
};
