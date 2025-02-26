import { decodeToken } from "../utils/token.util.js"

export const isAdmin = (req, res, next) => {
    try {
        const data = decodeToken(req.headers)
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