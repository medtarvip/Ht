import fetch from "node-fetch"

let edit = async (m, { conn, text, command }) => {
    try {

        if (!text) {
            return m.reply(`🎬 اكتب اسم الشخصية

مثال:
.${command} ناروتو
.${command} gojo
.${command} eren`)
        }

        await conn.sendMessage(m.chat, {
            react: {
                text: "🪀",
                key: m.key
            }
        })

        let query = `${text} edit`

        let res = await fetch("https://www.tikwm.com/api/feed/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0"
            },
            body: `keywords=${encodeURIComponent(query)}&count=5&cursor=0&HD=1`
        })

        let json = await res.json()

        if (!json.data || !json.data.videos || json.data.videos.length < 1) {
            return m.reply("❌ لم أجد أي اديت")
        }

        let video = json.data.videos[0]

        let caption = `✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️`

        await conn.sendMessage(m.chat, {
            video: {
                url: video.hdplay || video.play
            },
            caption,
            mimetype: "video/mp4"
        }, {
            quoted: m
        })

        await conn.sendMessage(m.chat, {
            react: {
                text: "✅",
                key: m.key
            }
        })

    } catch (e) {

        console.log(e)

        await conn.sendMessage(m.chat, {
            react: {
                text: "❌",
                key: m.key
            }
        })

        m.reply("❌ حدث خطأ")
    }
}

function formatNum(n) {
    if (!n) return "0"

    if (n >= 1000000)
        return (n / 1000000).toFixed(1) + "M"

    if (n >= 1000)
        return (n / 1000).toFixed(1) + "K"

    return n.toString()
}

edit.command = ["اديت_تيكتوك", "اديت_تيكتوك", "اديت_تيكتوك"]
edit.category = "search"

export default edit