import { createUser, destroyOneUser, readAllUser, readOneUser, updateOneUser } from "../controllers/user.controller.js";
import { isAdmin } from "../middleware/isAdmin.mid.js";
import isAuth from "../middleware/isAuth.mid.js";
import { passportCallback } from "../middleware/passportCallack.mid.js";
import { CustomRouter } from "../utils/CustomRouter.util.js";

class UsersRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["ADMIN"],passportCallback("register"), createUser);
        this.read("/", ["USER"], readAllUser);
        this.read("/:uid_req", ["USER", "ADMIN"], readOneUser);
        this.update("/:uid_req", ["USER", "ADMIN"], passportCallback("jwt-auth"), updateOneUser);
        this.destroy("/:uid_req", ["USER", "ADMIN"], passportCallback("jwt-auth"), destroyOneUser);
    };
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();