import { usersManager } from "../../dao/dao.js";
import { UserDto } from "../../dto/users.dto.js";

class UserRepository {
    createUser = async (userData) => await usersManager.create(new UserDto(userData));
    readAllUsers = async () => await usersManager.read();
    readOneUser = async (uid) => await usersManager.readById(uid)
    readOneUserByEmail = async (email) => await usersManager.readBy({ email })
    updateOneUser = async (uid, updateData) => await usersManager.updateById(uid, updateData, { new: true })
    destroyOneUser = async (uid) => await usersManager.destroyById(uid)
}

export const userRepository = new UserRepository();

