const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ نظام البوتات الفرعية غير متاح");

  const bots = sub.list();
  if (bots.length === 0) {
    return m.reply(`
╭━━━〔 ✦ 𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓 ✦ 〕━━━╮
┃ لا يوجد بوتات فرعية مثبتة
╰━━━━━━━━━━━━━━━━━━━━━━╯
`);
  }

  let text = `
╭━━━〔 ✦ 𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓 ✦ 〕━━━╮
┃ قائمة البوتات الفرعية
╰━━━━━━━━━━━━━━━━━━━━━━╯
`;

  const mentions = [];

  bots.forEach((b, i) => {
    const jid = b.phone ? `${b.phone}@s.whatsapp.net` : null;
    if (jid) mentions.push(jid);

    text += `
╭━━〔 #${i + 1} 〕━━╮
┃ ➤ الرقم: ${jid ? `@${b.phone}` : b.phone || "غير معروف"}
┃ ➤ الحالة: ${b.connected ? "متصل" : "غير متصل"}
┃ ➤ الرسائل: ${b.messages || 0}
┃ ➤ الايدي: ${b.id}
╰━━━━━━━━━━━━━━╯
`;
  });

  text += `
╭━━━〔 ✦ العدد الكلي ✦ 〕━━━╮
┃ ${bots.length}
╰━━━━━━━━━━━━━━━━━━━━━━╯
`;

  const { images } = bot.config.info;
  const img =
    images?.[Math.floor(Math.random() * images.length)] ||
    "https://i.postimg.cc/B66Ln6xd/IMG-20260428-WA0076.webp";

  await conn.sendMessage(
    m.chat,
    {
      text,
      mentions,
      contextInfo: {
        externalAdReply: {
          title: "𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓",
          body: "نظام البوتات الفرعية",
          thumbnailUrl: img,
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    },
    { quoted: m }
  );
};

run.command = ["البوتات", "bots"];
run.noSub = true;
run.usage = ["تنصيب"];
run.category = "البوتات";
export default run;