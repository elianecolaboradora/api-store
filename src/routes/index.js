import { CustomRouter } from "../utils/CustomRouter.util.js";
import usersRouter  from "./users.router.js";
import authRouter  from "./auth.router.js";
import productsRouter  from "./products.router.js";
import cookieRouter  from "./cookie.router.js";
import cartRouter  from "./cart.router.js";

class ApiRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }
    init = () => {
        this.use("/auth", ["PUBLIC"], authRouter)
        this.use("/users", ["PUBLIC"], usersRouter)
        this.use("/products", ["PUBLIC"], productsRouter)
        this.use("/cart", ["PUBLIC"], cartRouter)
        this.use("/cookies", ["PUBLIC"], cookieRouter)
    }
}

const router = new ApiRouter()

export default router.getRouter()
