const nodemailer = require("nodemailer");

const emailConfig = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bubachico@gmail.com",
        pass: process.env.PASSWORD_APPLICATION
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: "bubachico@gmail.com",
            to: to,
            subject: subject,
            html: html
        };
        await emailConfig.sendMail(mailOptions);
    } catch (error) {
        console.log("Ha fallao el ebnvio " + error.message);
    }


}

module.exports = { sendEmail }