import { Router } from "express";
import passport from "../middleware/passport.mid.js";

const sessionsRouter = Router()

const getCurrentSession = (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "No autorizado" });
        }

        return res.status(200).json({
            message: "Sesión activa",
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Error obteniendo sesión", error: error.message });
    }
};

sessionsRouter.post("/", (req, res, next) => {
    try {
        req.session.role = "ADMIN"
        req.session.mode = "dark"
        const response = {
            message: "Session guardada"
        }
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

sessionsRouter.get(
    "/",
    passport.authenticate("jwt-auth", { session: false }),
    getCurrentSession
)

sessionsRouter.delete("/", (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            message: "Sessions eliminada"
        })
    } catch (error) {
        next(error)
    }
})


export {
    sessionsRouter
}