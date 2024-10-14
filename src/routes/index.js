import { Router } from "express";
import { productsRouter } from "./products.router.js";
import { cartRouter } from "./carts.router.js";
import { viewsRouter } from "./views.router.js";

const router = Router()

router.use("/products", productsRouter)
router.use("/carts", cartRouter)

export {router}