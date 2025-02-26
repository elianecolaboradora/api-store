import { Router } from "express";
import passport from "../middleware/passport.mid.js";
import { passportCb } from "../middleware/passportCb.mis.js";

const routerUser = Router()

const renderRegister = (req, res, next) => {
    try {
        res.status(200).render('register')
    } catch (error) {
        next(error)
    }
}

const renderLogin = (req, res, next) => {
    try {
        res.status(200).render('login');
    } catch (error) {
        next(error)
    }
}

const register = (req, res, next) => {
    try {
        if (!req.user) throw new Error("Error en la autenticación de Passport.");
        res.status(201).json({ message: "Registered", _id: req.user._id });
    } catch (error) {
        res.status(500).json({ message: "Error en el registro", error: error.message });
    }
};

const login = (req, res, next) => {
    try {
        const user = req.user;
        if (!user || !user.token) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        console.log(user.token)

        res.status(200)
            .cookie("currentUser", user.token, {
                httpOnly: true, 
                sameSite: "Lax",
                path: "/",
            })
            .json({
                message: "Logged in",
                _id: user._id,
                token: user.token
            });
    } catch (error) {
        next(error)
    }
}

const signout = (req, res, next) => {
    try {
        res.clearCookie("currentUser", { 
            path: "/",
            httpOnly: true,
            sameSite: "Lax"
        });
        res.status(200).json({ message: "signed out" });
    } catch (error) {
        next(error);
    }
}

routerUser.get("/register",renderRegister);

routerUser.get("/login",renderLogin)

routerUser.get('/current', 
    passport.authenticate('jwt-auth', { session: false }), 
    (req, res) => res.json({ user: req.user })
);

routerUser.post(
    "/register",
    (req, res, next) => {
        passport.authenticate("register", { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: info?.message || "Authentication failed" });
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    register
);

routerUser.post(
    "/login",
    (req, res, next) => {
        passport.authenticate("login", { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: info?.message || "Authentication failed" });
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    login
)

routerUser.post(
    "/signout",
    passportCb("jwt-auth"),
    signout
)

export { routerUser }