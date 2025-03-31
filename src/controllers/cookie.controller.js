import { Router } from "express";

const cookiesRouter = Router()

const createCookie = (req, res, next) => {
    try {
        const maxAge = 10000;
        const response = { message: "Cookie vence en 10 segundos" };
        return res
            .status(200)
            .cookie("role", "USER")
            .cookie("mode", "dark", { maxAge })
            .json(response);
    } catch (error) {
        next(error);
    }
}

const setSignedCookie = (req, res, next) => {
    try {
        const { user_id } = req.body
        const maxAge = 10000;
        const response = { message: "Cookie firmada vence en 10 segundos" };
        return res
            .status(200)
            .cookie("user_id", user_id, { maxAge, signed: true })
            .json(response);
    } catch (error) {
        next(error);
    }
}

const getCookies = (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { role } = req.cookies;
        return res.status(200).json({ role, cookies })
    } catch (error) {
        next(error)
    }
}

const getSignedCookies = (req, res, next) => {
    try {
        const cookies = req.signedCookies;
        const { user_id } = req.signedCookies;
        return res.status(200).json({ user_id, cookies });
    } catch (error) {
        next(error)
    }
}

const destroyCookie = (req, res, next) => {
    try {
        return res
            .status(200)
            .clearCookie("role")
            .clearCookie("mode")
            .json({ message: "Cookie eliminada" });
    } catch (error) {
        next(error);
    }
}

cookiesRouter.post("/", createCookie)
cookiesRouter.post("/signed:", setSignedCookie)
cookiesRouter.get("/", getCookies)
cookiesRouter.get("/signed", getSignedCookies)
cookiesRouter.get("/clear", destroyCookie);

export {
    createCookie,
    setSignedCookie,
    getCookies,
    getSignedCookies,
    destroyCookie
}