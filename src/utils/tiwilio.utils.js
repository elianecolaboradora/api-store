import twilio from "twilio"
import { envpath } from "./env.utils.js"
process.loadEnvFile(envpath)

const { ACCOUNT_SID, TWILIO_TOKEN, TWILIO_PHONE } = process.env
export async function twilioUtils(text, userPhone) {
    try {
        const client = twilio(ACCOUNT_SID,TWILIO_TOKEN)
        await client.messages.create({
            body: text,
            from: TWILIO_PHONE,
            to: userPhone
        })
    } catch (error) {
        throw error
    }
}