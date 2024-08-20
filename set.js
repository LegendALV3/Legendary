const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BUT3lodklaRWp2bHczMXFIT0NYdU91N1FtbHlRUGtzV3F2VVJ1cUhFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3V1dVVVWUlmY3F5RnJMWnNkazFZT1NRQ09mVHdFclNPRld2YTdrZDR4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRHhNdm1tWVVLL2s2Ny8xWVZXU3RtU0d2YzVUQlV0VFRqMmUxdzA5UDA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5cnNXWXZiRzZTOHlGVjZPS1M0MENWMWg1eDh5ckQybSs1c1hKblI2aDFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1MZ0R6aTdTTEpoSTJaZC9ub1JUNzUxcEFtTVBIb0kxM2R0T2tYMzFIbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDdkF3V1VESXEzYUpPNi94UzRKYWhHN1RkNVRYSk1vZlpTUUNVQ1MwSFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUdncGlVcThNK3FidzRhRTRtMzk3dXdXQmJTb05SVVBKZHlhaHRmaC9tOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlNVZ3FIOEZvTUU4cGEvTWZORFJqZGpWRjZMMTQ2Q0E0ZGk5YlRsekNXZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im15dlE3TWROZDZPWmJQUHBlVW1wY2h5MFNTNS9zdVFRZEpKS1lua1Nqc3lpMXBtS0Q2OFdhSkxWejM1eHhneEtRaGhESDQveGxZWHV1NUhiZjEyWWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiJWYUE3TGZNRmVFRlVwalNucW9keXVYbmtJeFV3enNrMDFhVWFmdkpTL0RnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzOHNBSTJ6NFFRT2JuTHV1Qm5XNVRnIiwicGhvbmVJZCI6ImY5MDFhOWE2LTYyNDUtNDIzNi1iYThkLTI4YjY2YjBhZjU0NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3RldadTEzZEhQVGk5bUc2TFlRbDRjOS9EYUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieDFPcEN0bm4rcXVBY1NBSmtiQjdyelF3dzI0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlA1S0FTQzhEIiwibWUiOnsiaWQiOiI5MTk0MDM2MjE4MTg6MTlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Vg/CdlZbwnZWY8J2VlvCdlZ/wnZWVIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWDBnYVFERU1iRWtiWUdHQTRnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzdi8rWE9IOEdiQ1ErS0JsNFora3NjSW5YeG5HZFR1RmhsUmVpT2JGbzEwPSIsImFjY291bnRTaWduYXR1cmUiOiJHdXNESzlTSFFPMWxRKzJUMTB1MEhGbmowUHFkWE5Qd0RIVzUyVE1RY1pxWDhvV3F1WmZKOWMvUzRyenVjaldNU0M4WlZyWkx0VU8vUGRsNlBTV2tDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiME14eGxJQXlKZ0cvMzdPeHlyTExldVh2bld5Zng2cmZVRm4ybGJ5SXNhWjRWSk9MQWZkV1U5WTkxWXY1MVFYdHRuekNQRnpuNmdoZ1hPT1k2VjljZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTk0MDM2MjE4MTg6MTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYkwvL2x6aC9CbXdrUGlnWmVHZnBMSENKMThaeG5VN2hZWlVYb2pteGFOZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDE0NjI1OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJNlcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Legend",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Legend",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Legendary',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
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


