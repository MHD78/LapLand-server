import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()

const regCodeMail = async (from, to, subject, text) => {
    console.log(from, to, subject, text)
    try {
        let mailOptions = ({
            from,
            to,
            subject,
            text
        })
        const Transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                accessToken: process.env.OAUTH_ACCESS_TOKEN
            }
        });
        return await Transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }

}

export default regCodeMail