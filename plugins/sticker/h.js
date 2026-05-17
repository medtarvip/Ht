import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, args }) => {
  if (!m.quoted) return m.reply(`
╭━━━〔 ✦ 𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓 ✦ 〕━━━╮
┃ يرجى الرد على ملصق
╰━━━━━━━━━━━━━━━━━━━━━━╯`);

  let [pack, author] = args.join(" ").split(" | ");

  if (!args.length) {
    return m.reply(`
╭━━━〔 ✦ 𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓 ✦ 〕━━━╮
┃ الاستخدام الصحيح:
┃ .حقوق اسم الباك | اسم المؤلف
┃
┃ المثال:
┃ .حقوق venom | 2010
╰━━━━━━━━━━━━━━━━━━━━━━╯`);
  }

  if (!pack) pack = "✨️𝐌𝐄𝐃 𝐓𝐀𝐑✨️ 🤞 ✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️";
  if (author === undefined) author = null;

  const q = m.quoted;

  const buffer = await createSticker(
    await q.download(),
    { mime: q.mimetype, pack, author }
  );

  await conn.sendMessage(
    m.chat,
    {
      sticker: buffer,
      contextInfo: context(m.sender, "https://i.postimg.cc/B66Ln6xd/IMG-20260428-WA0076.webp")
    },
    { quoted: m }
  );
};

test.usage = ["حقوق نص | نص"];
test.command = ["حقوق"];
test.category = "sticker";

export default test;

const context = (jid, img) => ({
  mentionedJid: [jid],
  isForwarded: true,
  forwardingScore: 1,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "none",
    newsletterName: "𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓",
    serverMessageId: 0
  },
  externalAdReply: {
    title: "𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓",
    body: "𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓",
    thumbnailUrl: img,
    sourceUrl: "",
    mediaType: 1,
    renderLargerThumbnail: true
  }
});