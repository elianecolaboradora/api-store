import { addOneProductFromCart, clearCart, createCart, deleteOneProductFromCart,deleteProductFromCart,destroyCart, readAllCart, readOneCart } from "../controllers/cart.controller.js";
import { CustomRouter } from "../utils/CustomRouter.util.js";

class CartRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.read("/", ["ADMIN"], readAllCart)
        this.create("/", ["USER"], createCart)
        this.read("/:cid",["USER","ADMIN"], readOneCart)
        this.update("/:cid/add/one/product/:pid",["USER"], addOneProductFromCart)
        this.update("/:cid/remove/one/product/:pid",["USER"], deleteOneProductFromCart)
        this.update("/:cid/remove/product/:pid",["USER"], deleteProductFromCart)
        this.update("/:cid",["USER","ADMIN"], clearCart)
        this.destroy("/:cid",["ADMIN"], destroyCart)
    }

}
const cartRouter = new CartRouter()

export default cartRouter.getRouter()
