import { createProduct, destroyOneProduct, readAllProduct, readOneProduct, updateOneProduct } from "../controllers/products.controller.js";
import { passportCallback } from "../middleware/passportCallack.mid.js";
import { CustomRouter } from "../utils/CustomRouter.util.js";

class ProductsRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/", ["ADMIN"],passportCallback("jwt-auth"), createProduct);
        this.read("/", ["PUBLIC"], readAllProduct);
        this.read("/:pid", ["PUBLIC"], readOneProduct);
        this.update("/:pid", ["ADMIN"], updateOneProduct);
        this.destroy("/:pid", ["ADMIN"], destroyOneProduct);
    }
}
const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()