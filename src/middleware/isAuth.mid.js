import { usersManager } from "../dao/dao.js"
import { decodeToken } from "../utils/token.util.js"

const isAuth = async(req, res, next) => {
    try{
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
        const data = decodeToken(token)
        const {email} = data
        const user = await usersManager.readBy({email})
        if(!user) {
            const error = new Error("Invalid credential")
            error.statusCode = 401
            throw error
        }
        req.user = user
        next()
    }catch(error){
        next(error)
    }
}
export default isAuth;