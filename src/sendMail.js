const nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendMail = async (orderDetail) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "hn54707@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            },
        })
        const info = await transport.sendMail({
            from: '"Giao dịch viên 👻" <hn54707@gmail.com>', 
            to: orderDetail.customer.email, 
            subject: "Hello ✔", 
            text: orderDetail.OrderInfo, 
            html: "<b>Hello world?</b>", 
          });

          console.log(info);
    } catch (error) {
        console.log(error);
    }
}
module.exports = sendMail;