import fetch from "node-fetch"

let handler = async (m, { conn, text, command }) => {

    const react = async (emoji) => {
        try {
            await conn.sendMessage(m.chat, {
                react: {
                    text: emoji,
                    key: m.key
                }
            })
        } catch {}
    }

    try {

        if (!text) {
            return m.reply(`🎬 اكتب كلمة البحث

مثال:
.${command} anime edit
.${command} gojo edit
.${command} naruto edit`)
        }

        await react("✨️")

        await m.reply("*استنا بجيب لك لإيديت...🥱*")

        let videos = await youtubeSearch(text)

        // ─── fallback ───
        if (!videos.length) {
            videos = await fallbackSearch(text)
        }

        if (!videos.length) {
            await react("❌")
            return m.reply("❌ لا توجد نتائج")
        }

        let video = videos[0]

        await conn.sendMessage(m.chat, {
            video: {
                url: video.url
            },
            mimetype: "video/mp4",
            caption: `✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️`
        }, { quoted: m })

        await react("🎭")

    } catch (e) {

        console.log(e)

        await react("❌")

        m.reply("❌ حدث خطأ")

    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━
// 🔥 YouTube Search
// ━━━━━━━━━━━━━━━━━━━━━━━━
async function youtubeSearch(query) {

    try {

        let res = await fetch(
            `https://ytsearcher.vercel.app/api/search?q=${encodeURIComponent(query + " edit")}`
        )

        let json = await res.json()

        let data = json?.videos || []

        if (!Array.isArray(data)) return []

        let vids = []

        for (let v of data) {

            if (v.url) {

                vids.push({
                    url: v.url
                })

            }
        }

        return vids

    } catch {

        return []

    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━
// ⚡ fallback TikTok
// ━━━━━━━━━━━━━━━━━━━━━━━━
async function fallbackSearch(query) {

    try {

        let res = await fetch(
            `https://tikwm.com/api/feed/search?keywords=${encodeURIComponent(query + " edit")}&count=5`
        )

        let json = await res.json()

        let data = json?.data?.videos || []

        return data.map(v => ({
            url: v?.hdplay || v?.play
        }))

    } catch {

        return []

    }
}

handler.command = /^(اديت_يوتيوب|youtubeedit|ytedit)$/i

handler.category = "search"

export default handler