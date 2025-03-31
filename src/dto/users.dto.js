import crypto from "crypto"
import argsUtils from "../utils/args.utils.js"

const { pers } = argsUtils

export class UserDto {
    constructor(data) {
        this.name = data.name
        this.date = data.date
        this.email = data.email
        this.password = data.password
        this.avatar = data.avatar || "https://cdn-icons-png.flaticon.com/512/6326/6326055.png"
        this.role = data.role || "USER",
        this.verifyCode = data.verifyCode
        this.verify = data.verify || false
        if(pers !== "mongo"){
            this._id = crypto.randomBytes(12).toString("hex")
            this.createAt = new Date()
            this.updateAt = new Date()
        }
    }

}