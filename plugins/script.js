

/*
const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "script",
    alias: ["sc","repo","info"],
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let repo =`
*╭──────────────●●►*
> *BOT OWNER:*
*|* *TIMNASA*

> *FREE_INTERNET_BOT-V1 REPO:*
*|* https://github.com/itx-alii-raza/FREE_INTERNET_BOT

> *SUPPORT GROUP:*
*|* https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31
*╰──────────────●●►*

> *CREATED BY TIMNASA TECH*
`
await conn.sendMessage(from, { text: repo ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363413554978773@newsletter',
      newsletterName: "FREE_INTARNET_BOT 🍁",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'FREE_INTARNET_BOT 🍁',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/itx-alii-raza/FREE_INTERNET_BOT" ,
thumbnailUrl: "https://i.ibb.co/8Dzbtwj2/mrfrankofc.jpg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})}catch(e){
console.log(e)
reply(`${e}`)
}
});
*/

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "script",
    alias: ["repo", "sc", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "🎗️",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/timnasa/FREE_INTERNET_BOT';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `*𝐇𝐄𝐋𝐋𝐎 𝐓𝐇𝐄𝐑𝐄 FREE_INTERNET_BOT 𝐖.𝐀 𝐁𝐎𝐓 𝐔𝐒𝐄𝐑!😇👑* 

> *sɪᴍᴘʟᴇ, ɪᴄʏ, ᴄᴏʟᴅ  & ʀɪᴄʜ ʟᴏᴀᴅᴇᴅ ʙᴏᴛ ᴡɪᴛʜ ᴀᴍᴀᴢɪɴɢ ғᴇᴀᴛᴜʀᴇs, ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ & ғᴏʀᴋ ᴛʜᴇ ʀᴇᴘᴏ🌟🍴*

*\`REPO LINK:\`📮*
> https://github.com/itx-alii-raza/FREE_INTERNET_BOT/fork

*\`BOT GC LINK:\`🪀*
> https://tinyurl.com/2acmqaqz

*\`BOT NAME:\`🤖*
> ${repoData.name}

*\`OWNER NAME:\`👨‍💻*
> 𝐀ɭīī 𝐈ƞ̄x̷īīɖ𝛆̽

*\`STARS:\`🌟*
> ${repoData.stargazers_count}

*\`FORKS:\`🍴*
> ${repoData.forks_count}

*\`DESCRIPTION:\`📑*
> ${repoData.description || 'No description'}\n
──────────────────
\n> *© POWERED BY TIMNASA* 🎐`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/heu4tc.png` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363413554978773@newsletter',
                    newsletterName: '☇ FREE_INTARNET_BOT 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ  ⃪🤖͎᪳᪳𝆺𝅥',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://cdn.ironman.my.id/i/wp4a7x.mp4' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363413554978773@newsletter',
                    newsletterName: '☇ FREE_INTARNET_BOT 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ  ⃪🤖͎᪳᪳𝆺𝅥',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
                
