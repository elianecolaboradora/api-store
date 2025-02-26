import { User } from "../models/users.model.js"
import { decodeToken } from "../utils/token.util.js"

const isAuth = async(req, res, next) => {
    try{
        const data = decodeToken(req.headers)
        const {email} = data
        const user = await User.findOne({email})
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