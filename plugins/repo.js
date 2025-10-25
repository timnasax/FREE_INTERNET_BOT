const axios = require('axios');
const { cmd } = require('../command');
const fs = require('fs');
const os = require('os');

// Load version from package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version || "1.0.0";

// Format uptime
function formatUptime(ms) {
    const sec = Math.floor((ms / 1000) % 60);
    const min = Math.floor((ms / (1000 * 60)) % 60);
    const hr = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hr}h ${min}m ${sec}s`;
}

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "📦 Show full repo & runtime stats",
    category: "main",
    react: "🧑‍💻",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://api.github.com/repos/timnasa/free_internet_bot';
        const { data } = await axios.get(repoUrl, { timeout: 8000 }); // timeout added

        const { stargazers_count, forks_count } = data;
        const estUsers = (stargazers_count + forks_count) * 5;

        const uptime = formatUptime(process.uptime() * 1000);
        const platform = os.platform().toUpperCase();
        const arch = os.arch().toUpperCase();

        // Optional: Count command files directly
        const commandFiles = fs.readdirSync('./plugins').filter(file => file.endsWith('.js')).length;

        const msg = `
╭━━〔 *⎈ Free Internet Bot Runtime Info* 〕━━⊷
┃
┃ 🧠 *Project:* Free Internet Bot
┃ 🔗 *Repo:* https://github.com/timnasa/free_internate_bot
┃ ⭐ Stars: ${stargazers_count}
┃ 🍴 Forks: ${forks_count}
┃ 👥 Estimated Users: ${estUsers}
┃ 🛠 Version: v${version}
┃ 💡 Commands Loaded: ${commandFiles}
┃ 🕒 Uptime: ${uptime}
┃ 💻 System: ${platform} (${arch})
┃
╰━━━⊷ *© timnasa tech 2025*`.trim();

        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [m.sender],
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363332512801418@newsletter',
                newsletterName: 'FREE INTERNET BOT 💖🦄',
                serverMessageId: 143
            }
        };

        // Send main stats
        await conn.sendMessage(from, { text: msg, contextInfo }, { quoted: mek });

        // Send fancy image
        await conn.sendMessage(from, {
            image: { url: 'https://fies.catbox.moe/173jef.jpeg' },
            caption: `✨ *Free Internet Bot: Powering Smart Chats!* ✨\n\n📎 *Repo:* github.com/SilvaTechB/timnasa-md-bot\n⭐ Stars: ${stargazers_count}\n🍴 Forks: ${forks_count}\n👥 Users: ${estUsers}`,
            contextInfo
        }, { quoted: mek });

        // Send promo audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/hpwsi2.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (err) {
        console.error("❌ Repo Error:", err.message);
        reply(`🚫 *Oops!* Couldn’t fetch repo info.\n💬 ${err.message || "Network/Timeout Error"}`);
    }
});