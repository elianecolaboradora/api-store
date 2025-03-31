import { userService } from "../services/user.service.js"
import { setUserByRole } from "../utils/setUserByRole.utils.js"

const createUser = async (req, res, next) => {
    try {

        return res.json201(null, "User created")
    } catch (error) {
        next(error)
    }
}

const readAllUser = async (req, res, next) => {
    try {
        const response = await userService.getAllUsers()
        return res.json200(response, "users obtained")
    } catch (error) {
        next(error)
    }
}

const readOneUser = async (req, res, next) => {
    try {
        const{role, _id}= req.user
        const { uid_req } = req.params;

        const getOneUser = async() => await userService.getOneUser(uid_req)
        const user_req = await setUserByRole(role, uid_req, _id, res, getOneUser)
        return res.json200(user_req, "user obtained")

    } catch (error) {
        next(error);
    }
}

const updateOneUser = async (req, res, next) => {
    try {
        const{role, _id}= req.user
        const { uid_req } = req.params;
        const data = req.body;

        const updateOneUser = async() => await userService.updateOneUser(uid_req, data)
        const user_req = await setUserByRole(role, uid_req, _id, res, updateOneUser)
        return res.json200(user_req, "User Updated")
    } catch (error) {
        next(error)
    }
}

const destroyOneUser = async (req, res, next) => {
    try {
        const{role, _id}= req.user
        const { uid_req } = req.params;

        const destroyOneUser = async() => await userService.destroyOneUser(uid_req)
        const user_req = await setUserByRole(role, uid_req, _id, res, destroyOneUser)
        return res.json200(user_req, "User deleted")
    } catch (error) {
        next(error)
    }
}

export {
    createUser,
    destroyOneUser,
    readAllUser,
    readOneUser,
    updateOneUser
}
