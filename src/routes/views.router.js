import { Router } from "express";
import {ProductManager} from "../services/ProductManager.js"

const viewsRouter = Router()
const productsManager = new ProductManager();

viewsRouter.get("/products", async (req, res) => {
    try{
        const products = await productsManager.getProducts();
        res.render("index", {products});

    }catch(error){
        console.log(error)
    }

})

//Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.

viewsRouter.get("/realtimeproducts", async (req, res) => {

    try{
        const products = await productsManager.getProducts();
        res.render("realtimeproducts", {products});

    }catch(error){
        console.log(error)
    }

})

export { viewsRouter }