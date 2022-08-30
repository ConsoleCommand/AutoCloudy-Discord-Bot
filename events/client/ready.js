module.exports = async bot => {
  console.log(`${bot.user.username} Artık Devrede`);
  // bot.user.setActivity("Baba Mrb", {type: "STREAMING", url:"https://twitch.tv/31ciPrefZA"});

  let statuses = [
    "☁ ConsoleBey#0290",
    "Make The Sky Great Again!",
    "Yapım Aşamasındayım..",
    "Benim Niye Sevgilim Yok...",
    "¯\\_(ツ)_/¯",
    "Sıkıldım Be.",
    "Pref1tR#1957"
  ];

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "WATCHING" });
  }, 5000);

  const channel = bot.channels.get("611208110010269706");
  if (!channel) return console.error("Böyle Bir Kanal Yok");
  channel
    .join()
    .then(connection => {
      console.log("Başarıyla Bağlanıldı.");
    })
    .catch(e => {
      console.error(e);
    });
};
