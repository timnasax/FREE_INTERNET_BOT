const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "owner",
  react: "🦋",
  desc: "Sends contact info of the bot owner.",
  category: "main",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const ownerNumber = config.OWNER_NUMBER;
    const ownerName = config.OWNER_NAME;

    // Construct a professional vCard
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD`;

    // Send vCard Contact
    await conn.sendMessage(from, {
      contacts: {
        displayName: ownerName,
        contacts: [{ vcard }]
      }
    }, { quoted: mek });

    // Send Image with Caption
    await conn.sendMessage(from, {
      image: { url: 'https://fies.catbox.moe/173jef.jpeg' },
      caption: 
`╭━━〔 *⎈ Free Internet Bot ⎈* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *Owner Name:* ${ownerName}
┃◈┃• *Phone:* ${ownerNumber}
┃◈┃• *Bot Version:* 2.0.1
┃◈┃• *Team:* timnasa Developers 💖
┃◈└───────────┈⊷
╰──────────────┈⊷
📣 _Reach out for support, updates, or collabs!_

> 🔐 *Powered by Free Internet Bot*`,
      contextInfo: {
        mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363332512801418@newsletter',
          newsletterName: 'Free Internet Bot',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Send Voice Note (PTT)
    await conn.sendMessage(from, {
      audio: {
        url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/contact.m4a'
      },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });

  } catch (error) {
    console.error("[OWNER COMMAND ERROR]", error);
    reply(`❌ *An error occurred:* ${error.message}`);
  }
});