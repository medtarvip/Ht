import axios from 'axios';
import qs from 'qs';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw `
✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️

╭━━━〔 🎭 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐃𝐋 🎬 〕━━━╮
┃ 💙 ضـع رابـط الـفـيـديـو بـعـد الأمـر
┃
┃ 🌐 مـثـال:
┃ /${command} https://facebook.com/reel/xxxx
╰━━━━━━━━━━━━━━━━━━━━╯`;

  m.react('🎩');

  try {

    const loading = await conn.sendMessage(m.chat, {
      text: `
✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️

╭━━━〔 ⏳ 𝐊𝐀𝐈𝐓𝐎 𝐌𝐎𝐃𝐄 🎩 〕━━━╮
┃ 🎬 جـاري سـرقـة الـفـيـديـو...
┃ ✨ انـتـظـر قـلـيـلاً يـا مـخـادع
╰━━━━━━━━━━━━━━━━━━━━╯`
    }, { quoted: m });

    const tokenRes = await userVerify(text);

    const htmlRes = await ajaxSearch(
      text,
      tokenRes.k_token,
      tokenRes.k_exp,
      tokenRes.token
    );

    const $ = cheerio.load(htmlRes.data);

    const title =
      $('.detail h3').text().trim() || 'Facebook Video';

    const duration =
      $('.detail p').first().text().trim() || '';

    const thumb =
      $('.detail .thumbnail img').attr('src') || '';

    const downloads = [];

    $('table.table tbody tr').each((_, el) => {

      const quality = $(el)
        .find('.video-quality')
        .text()
        .trim();

      const url = $(el)
        .find('a.download-link-fb')
        .attr('href');

      if (quality && url) {
        downloads.push({ quality, url });
      }

    });

    if (!downloads.length)
      throw '❌ لا يوجد فيديو متاح للتحميل';

    const caption = `
✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️

╭━━━〔 🎬 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐕𝐈𝐃𝐄𝐎 🎬 〕━━━╮
┃ 📌 الـعـنـوان:
┃ ${title}
┃
┃ ⏳ الـمـدة:
┃ ${duration || 'غير معروف'}
┃
┃ 🎞️ الـجـودة:
┃ ${downloads[0].quality}
┃
┃ 👤 بـواسـطـة:
┃ ${m.pushName}
╰━━━━━━━━━━━━━━━━━━━━╯`;

    await conn.sendMessage(m.chat, {
      video: { url: downloads[0].url },
      caption,
      thumbnail: thumb
    }, {
      quoted: m,
      edit: loading.key
    });

    m.react('✨');

  } catch (e) {

    console.log(e.message);

    m.react('❌');

    m.reply(`
✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️

╭━━━〔 ❌ 𝐄𝐑𝐑𝐎𝐑 ❌ 〕━━━╮
┃ 💔 حـدث خـطـأ أثـنـاء الـتـحـمـيـل
┃ 🔄 حـاول مـرة أخـرى
╰━━━━━━━━━━━━━━━━━━━━╯`);
  }
};

handler.usage = ["فيس"];
handler.category = "downloads";
handler.command = /^(فيس|فيسبوك|fb|fbdl|facebook)$/i;

export default handler;

async function userVerify(url) {

  const data = qs.stringify({ url });

  const headers = {
    'Content-Type':
      'application/x-www-form-urlencoded; charset=UTF-8',

    'Accept': '*/*',

    'X-Requested-With': 'XMLHttpRequest',

    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64)',

    'Referer':
      'https://fdownloader.net/id'
  };

  const res = await axios.post(
    'https://fdownloader.net/api/userverify',
    data,
    { headers }
  );

  return res.data;
}

async function ajaxSearch(query, token, exp, cftoken) {

  const data = qs.stringify({
    k_exp: exp,
    k_token: token,
    q: query,
    lang: 'id',
    web: 'fdownloader.net',
    v: 'v2',
    w: '',
    cftoken
  });

  const headers = {
    'Content-Type':
      'application/x-www-form-urlencoded; charset=UTF-8',

    'Accept': '*/*',

    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64)',

    'Referer':
      'https://fdownloader.net/id'
  };

  const res = await axios.post(
    'https://v3.fdownloader.net/api/ajaxSearch',
    data,
    { headers }
  );

  return res.data;
}