import { connect } from "mongoose"
import { envpath } from "./env.utils.js"

process.loadEnvFile(envpath)

export async function dbConnect() {
    try {
        await connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error.message)
    }
}