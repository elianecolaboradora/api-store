import { Router } from "express";
import passport from "../middleware/passport.mid.js";

const routerUser = Router()

const renderRegister = (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).render('register')
    } catch (error) {
        next(error)
    }
}

const renderLogin = (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).render('login');
    } catch (error) {
        next(error)
    }
}

const register = (req, res, next) => {
    try {
        const user = req.user;
        res.status(201).json({ message: "Registered", _id: user._id });
    } catch (error) {
        next(error);
    }
};

const login = (req, res, next) => {
    try {
        const user = req.user;
        res.status(200)
            .cookie("currentUser", user.token, {
                httpOnly: true, // Protege la cookie contra ataques XSS
                sameSite: "strict", // Mejora la seguridad contra CSRF
            })
            .json({
                message: "Logged in",
                _id: user._id,
            });
    } catch (error) {
        next(error)
    }
}


routerUser.get("/register", register);
routerUser.get("/login",login)

routerUser.post(
    "/register",
    passport.authenticate("register", { session: false }),
    renderRegister
);

routerUser.post(
    "/login",
    passport.authenticate("login", { session: false }),
    renderLogin
)


export { routerUser }