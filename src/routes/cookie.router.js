import { createCookie, setSignedCookie, getCookies, getSignedCookies, destroyCookie } from "../controllers/cookie.controller.js";
import { passportCallback } from "../middleware/passportCallack.mid.js";
import { CustomRouter } from "../utils/CustomRouter.util.js";

class CookieRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"],passportCallback("jwt-auth"), createCookie);
        this.create("/signed", ["ADMIN"], passportCallback("jwt-adm"), setSignedCookie);
        this.read("/", ["PUBLIC"], getCookies);
        this.read("/signed", ["ADMIN"], passportCallback("jwt-adm"), getSignedCookies);
        this.destroy("/clear", ["USER", "ADMIN"], passportCallback("jwt-auth"), destroyCookie);
    };
}

const cookieRouter = new CookieRouter();
export default cookieRouter.getRouter();