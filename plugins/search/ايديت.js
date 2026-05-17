let handler = async (m, { conn, text, usedPrefix }) => {

    try {

        if (!text) {
            return m.reply(`📌 مثال:\n${usedPrefix}ايديت كايتو`)
        }

        // ✨️ react
        await conn.sendMessage(m.chat, {
            react: {
                text: "✨️",
                key: m.key
            }
        })

        await new Promise(r => setTimeout(r, 900))

        // 🪀 react
        await conn.sendMessage(m.chat, {
            react: {
                text: "🪀",
                key: m.key
            }
        })

        await new Promise(r => setTimeout(r, 900))
        
      // 🤞 react
        await conn.sendMessage(m.chat, {
            react: {
                text: "🤞",
                key: m.key
            }
        })

        await new Promise(r => setTimeout(r, 900))

        // 💎 MENU
        await conn.sendMessage(m.chat, {
            text:
`╭━━━〔 ✨ 𝐄𝐃𝐈𝐓 𝐇𝐔𝐁 ✨ 〕━━━╮
┃
┃ 🎬 اختر نوع الإيديت المطلوب
┃ 📌 سيتم تنفيذ البحث مباشرة
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
            footer: "✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️",
            buttons: [

                {
                    buttonId: `${usedPrefix}اديت_تيكتوك ${text}`,
                    buttonText: {
                        displayText: "🎬 𝐓𝐈𝐊𝐓𝐎𝐊 𝐄𝐃𝐈𝐓"
                    },
                    type: 1
                },

                {
                    buttonId: `${usedPrefix}ايديت_بينترست ${text}`,
                    buttonText: {
                        displayText: "📌 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 𝐄𝐃𝐈𝐓"
                    },
                    type: 1
                },

                {
                    buttonId: `${usedPrefix}اديت_يوتيوب ${text}`,
                    buttonText: {
                        displayText: "▶️ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐄𝐃𝐈𝐓"
                    },
                    type: 1
                }

            ],
            headerType: 1

        }, { quoted: m })

    } catch (e) {

        console.log(e)

        m.reply("❌ خطأ في النظام")

    }
}

handler.command = /^ايديت$/i

export default handler