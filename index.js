import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '967735706688', // Bot number
  prefix: [".", "/", "!"],
  fromMe: null, 
  owners: [
  // Owner 1
    { name: "🎭𝐌𝐄𝐃 𝐓𝐀𝐑🎭", lid: "247579682029763@lid", jid: "22242203253@s.whatsapp.net" },
  // Owner 2
    { name: "🎭𝐌𝐄𝐃 𝐓𝐀𝐑🎭", lid: "221307316789354@lid", jid: "967735686159@s.whatsapp.net" },
  // Owner 3
    { name: "🎭𝐌𝐄𝐃 𝐓𝐀𝐑🎭", jid: "22242203253@s.whatsapp.net", lid: "50414477168824@lid" },
  // Owner 4 
   { name: "🎭𝐌𝐄𝐃 𝐓𝐀𝐑🎭", jid: "967735686159@s.whatsapp.net", lid: "51664513925368@lid" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️", 
  nameChannel: "✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️", 
  idChannel: "120363225356834044@newsletter",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbCSYLtBqbrIKRmDdc3F"
  },
  copyright: { 
    pack: '✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️', 
    author: '✨️𝐊𝐀𝐈𝐓𝐎 𝐊𝐈𝐃 𝐁𝐎𝐓✨️',
  },
  images: [
    "https://i.postimg.cc/B66Ln6xd/IMG-20260428-WA0076.webp",
    "https://i.postimg.cc/B66Ln6xd/IMG-20260428-WA0076.webp",
    "https://i.postimg.cc/B66Ln6xd/IMG-20260428-WA0076.webp"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});


/* 
=========== Memory Monitor ========== 

setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1) 
    }
}, 300_000) 

*/