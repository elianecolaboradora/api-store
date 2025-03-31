import { createTransport } from "nodemailer"
const {GOOGLE_PASSWORD, GOOGLE_EMAIL } = process.env

export async function verifyAccount({to, verifyCode}){
    try {
        const user = GOOGLE_EMAIL
        const pass = GOOGLE_PASSWORD
        const transport = createTransport({
            host:"smtp.gmail.com",
            port: 465,
            secure: true,
            auth:{user, pass}
        })
        await transport.sendMail({
            from: `CODER ADMIN <${user}>`,
            to,
            subject: "verify your coder commerce acount",
            html: `YOUR VERIFY TOKEN IS ${verifyCode}`
        })
    } catch (error) {
        throw Error(error)
    }
}