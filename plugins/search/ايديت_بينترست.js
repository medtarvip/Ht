import fetch from "node-fetch"

let handler = async (m, { conn, text, command }) => {

    const react = async (emoji) => {
        try {
            await conn.sendMessage(m.chat, {
                react: { text: emoji, key: m.key }
            })
        } catch {}
    }

    try {

        if (!text) {
            return m.reply(`🎬 اكتب كلمة البحث

مثال:
.${command} anime edit
.${command} aesthetic edit`)
        }

        await react("🪀")
        await m.reply("*استنى بجيب لك لإيديت ....👏*")

        let videos = await pinterestSearch(text)

        // ─── fallback لو Pinterest فشل ───
        if (!videos.length) {
            videos = await fallbackSearch(text)
        }

        if (!videos.length) {
            await react("❌")
            return m.reply("❌ لا توجد نتائج حاليًا، حاول كلمة أخرى")
        }

        let video = videos[0]

        await conn.sendMessage(m.chat, {
            video: { url: video.url },
            caption: `✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️`
        }, { quoted: m })

        await react("✅")

    } catch (e) {
        console.log(e)
        await react("❌")
        m.reply("❌ خطأ في البحث")
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━
// 🔥 Pinterest Search قوي
// ━━━━━━━━━━━━━━━━━━━━━━━━
async function pinterestSearch(query) {

    try {

        let res = await fetch(
            `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=/search/pins/?q=${encodeURIComponent(query)}&data={"options":{"query":"${query}","scope":"videos","page_size":20}}`
        )

        let json = await res.json()

        let data = json?.resource_response?.data?.results

        if (!Array.isArray(data)) return []

        let vids = []

        for (let v of data) {

            let url =
                v?.videos?.video_list?.V_720P?.url ||
                v?.videos?.video_list?.V_480P?.url ||
                v?.videos?.video_list?.V_360P?.url

            if (url) vids.push({ url })
        }

        return vids

    } catch (e) {
        return []
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━
// ⚡ fallback أقوى (لو Pinterest فشل)
// ━━━━━━━━━━━━━━━━━━━━━━━━
async function fallbackSearch(query) {

    try {

        let res = await fetch(`https://tikwm.com/api/feed/search?keywords=${encodeURIComponent(query)} edit&count=5`)
        let json = await res.json()

        let data = json?.data?.videos || []

        return data.map(v => ({
            url: v?.hdplay || v?.play
        }))

    } catch {
        return []
    }
}

handler.command = ["ايديت_بينترست", "pinedit", "pinterestedit"]
handler.category = "search"

export default handler