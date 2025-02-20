import { Router } from "express";
import { productsRouter } from "./products.router.js";
import { cartRouter } from "./carts.router.js";
import { viewsRouter } from "./views.router.js";
import { routerUser } from "./users.router.js";

const router = Router()

router.use("/products", productsRouter)
router.use("/carts", cartRouter)
router.use("/users", routerUser)
export {router}