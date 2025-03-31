import { userRepository } from "../data/repositories/users.repository.js";
import { errorHandler } from "../middleware/errorHandler.mid.js";

class UserService {
    createUser = async (userData) => {
        return await userRepository.createUser(userData);
    }
    
    getAllUsers = async () => {
        const users = await userRepository.readAllUsers()
        return users
    }

    getOneUser = async (uid) => {
        const user = await userRepository.readOneUser(uid)
        return user
    }

    updateOneUser = async (uid, updateData) => {
        const updatedUser = await userRepository.updateOneUser(uid, updateData);

        return updatedUser;
    }

    destroyOneUser = async (uid) => {

        const deletedUser = await userRepository.destroyOneUser(uid);
        if (!deletedUser) errorHandler("User not found", 404);

        return { message: "User successfully deleted" };
    }

    verifyUser = async (email, code) => {
        const user = await userRepository.readOneUserByEmail(email);
        const isValid = code === user.verifyCode;
        if (isValid) {
            await userRepository.updateOneUser(user._id, { verify: true });
        }
        return isValid;
    }
}

export const userService = new UserService();