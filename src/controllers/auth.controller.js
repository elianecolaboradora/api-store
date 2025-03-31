import { userService } from "../services/user.service.js"
import { nodeMailerUtil } from "../utils/nodemailer.utlis.js";
import { twilioUtils } from "../utils/tiwilio.utils.js";

const register = async (req, res) => {
    const user = req.user;
    res.json201(user, "Registered")
}

const login = async (req, res) => {
    const { user, token } = req.user;  // Extraemos los datos correctamente
    console.log(user)
    console.log(token)
    if (!token) res.json500("No token generated")
    // Configurar la cookie
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
    res
        .cookie("token", token, opts)
        .json200({ user, token }, "Logged in")
}

const signout = async (req, res) => {
    res.clearCookie("token").json200(null, "signed out")
}

const online = (req, res) => {
    res.json200(null, "It's online")
}

const google = async (req, res) => {
    console.log("Google callback received:", req.user);

    if (!req.user) {
        return res.status(401).json({ message: "Authentication failed" });
    }

    const { token, user } = req.user;
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };

    res.cookie("token", token, opts);
    return res.status(200).json({ user, token, message: "Logged in with Google" });
}

const failure = (req, res) => {
    res.json401("Google Error")
}

const twilio = async (req, res) => {
    const { phone } = req.body
    const text = "mensaje de prueba"
    await twilioUtils(text, phone)
    res.json200(null, "SMS send")
}
const nodemailer = async (req, res) => {
    const { email } = req.body
    await nodeMailerUtil(email)
    res.json200(null, "verify email sent")
}
const verify = async (req, res) => {
    const { email, code } = req.body
    const user = await userService.verifyUser(email, code)
    if (!user) res.json401()
    else res.json200(null, "Account verify")
}

export {
    register,
    login,
    signout,
    online,
    google,
    failure,
    twilio,
    nodemailer,
    verify
}