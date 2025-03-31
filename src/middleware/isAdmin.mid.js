import { decodeToken } from "../utils/token.util.js"

export const isAdmin = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        const data = decodeToken(token)
        const { role, user_id } = data
        if (role !== "ADMIN") {
            const error = new Error("Forbbiden")
            error.statusCode = 403
            throw error
        }
        req.body.owner_id = user_id
        return next()
    } catch (error) {
        next(error)
    }
}