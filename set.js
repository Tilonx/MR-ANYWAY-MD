const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUlyWXR1Y0U5OW9wQXliOHdhK3NmWmlZS05VdDVieVFzbUZ6TzZncFpHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0tCVUdlY3dndlZvMDB3ZWJ0SjJuSmVpUHFVN092WCtGbVFTT3lOMnVVaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRlRhQTU4cXlRdmlmUlN6UDhLRHg1Smhmd2lHZjBxeEZMclRSTFhDUlc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQmd0QjdZcmFRdHAxWWNZWDlMa1VSbmtiUUNSdHRkMzQxR0thS0w2MkhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMaFNvN3VMcUhJTGpyR3htMU1ZVGtmNVEzTFRuRWprajhBZlZSakdFbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRsVWFEUWZZTHpSZUZ4NWdpMUphSlo3d3pGV09IOGo2UXJTRmxBSXhCUXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk5NTjVLTzBxRzRLeW1zdlNEQXB2ZmRCZUd1VlpqbTVUKzZvUUE2MWsxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmJSdlFzQXdCNEFzU0JkbjAwbUxEbVlXaWc4dVBoU1c0VTBuTUZCZ2tqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdDQ2NuMTVnODJDRWE2aDh2ZlBzNjNhaEZYOUk5YmpqSTlacFQ3THBMNVFwNHFPLzB4Q09OWUl6TXlOdTJBNXZBNmJ6QmJQSjhMWVFNRDJtMEovckR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODMsImFkdlNlY3JldEtleSI6ImdKUlBCdTUwV29VdHpTbUpPRGxNRUJVdkx6SzRKdytOM0hrWlZxSE1oU2c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkJBdm5jY3BpVE55WEs3R3ptTzNJWEEiLCJwaG9uZUlkIjoiMmZiYWRlZDgtZTM4MS00Nzg4LTk1NjMtMTUyN2FiMGE0Yjg2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlE1RWVDUS8zU3k2NDd3SndkaFNsQzZQbHF0bz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQc2VMNXkzZ1N1VDJqeU4weVl6SXhUb1FhcGM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWEtMSE02R1kiLCJtZSI6eyJpZCI6IjIzMzU5ODI3NTg3MzoyMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTEtTaUlnQ0VLUEowYmdHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZXR2VTExcDJxWndXbWtoUC9QaDhCVGlOYjVQa1NlZlRrV2M1cDE0ZlNoWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNk4zLzlVb0xXOVBGWGFvMThqWW5ydE40YTh4U3JNaTFkWUg4aWFTQmRBTkpZSG01VklxQVdNZVZIS2MrVTl0NzVOMVhQWU4rWFYxd2h1OFlXS3g5QVE9PSIsImRldmljZVNpZ25hdHVyZSI6InhNMGJybkFoU3FPOEV2V1E0R2l1OVVPb3AwU0wwdTM1WStSSjZUM2J5aUJadkUycGRlcUJJNmExUnNMMnpsYnJDNmR6NUw3cldDSkpyc0U2cjhtT0FRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTk4Mjc1ODczOjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhyYjFOZGFkcW1jRnBwSVQvejRmQVU0alcrVDVFbm4wNUZuT2FkZUgwb1cifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkzODk3NDQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUFU4In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "LØRD TĨLØÑX",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233598275873",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
