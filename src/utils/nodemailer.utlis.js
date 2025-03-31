import { createTransport } from "nodemailer"
const {GOOGLE_PASSWORD, GOOGLE_EMAIL } = process.env

export async function nodeMailerUtil(to){
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
            html: "Your verify token is:183023038"
        })
    } catch (error) {
        
    }
}