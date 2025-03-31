import isAuth from "../middleware/isAuth.mid.js";
import { failure, google, login, online, register, signout, twilio, nodemailer, verify } from "../controllers/auth.controller.js";
import { passportCallback } from "../middleware/passportCallack.mid.js";
import { CustomRouter } from "../utils/CustomRouter.util.js";

class AuthRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/register", ["PUBLIC"], passportCallback("register"), register);
        this.create("/login", ["PUBLIC"], passportCallback("login"), login);
        this.create("/signout", ["USER", "ADMIN"], signout)
        this.create("/online", ["USER", "ADMIN"], online)
        this.read("/google/callback", ["PUBLIC"], passportCallback("google"), google);
        this.create("/google/failure", ["PUBLIC"], failure)
        this.create("/twilio/:phone", ["PUBLIC"], twilio)
        this.read("/nodemailer/:email", ["PUBLIC"], nodemailer)
        this.create("/verify", ["PUBLIC"], verify)
    }
}

const authRouter = new AuthRouter()

export default authRouter.getRouter()