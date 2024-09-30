import { Router } from "express";
import { CartManager } from "../services/CartManager.js";

const cartRouter = Router()
const cartManager = new CartManager();

cartRouter.get("/", async (request, response) => {

    try{

        const products = await cartManager.getCarts();
        response.json(products);

    } catch (error) {
        response.status(500).send("Error interno del servidor");
    }

});
cartRouter.get("/:cid", async (request, response) => {

    try{
        const { cid } = request.params
        const products = await cartManager.getCartById(cid);
        const foundProduct =products.find(product => product.id == cid)
        if(!foundProduct) response.json({messaje:"El cart no existe"})
        response.json(foundProduct)

    }catch(error){
        response.status(404).send("No se entra el path");
    }

});
cartRouter.post("/", async (request, response) => {

    try {
        const productoguaradado = await cartManager.addCart();
        if(productoguaradado) response.status(201).json("Producto agregado exitosamente")
    } catch (error) {
        response.status(500).send("No se puede agregar este producto"); 
    }
});
cartRouter.post("/:cid/product/:pid", async (request, response) => {

    try{
        const { cid, pid } = request.params
        const products = await cartManager.addProduct(cid, pid);
        if(products) response.json(products)
        else response.send(error.messaje)

    }catch(error){
        response.status(500).send("Error al agregar productos al carrito");
    }

});
export {cartRouter}
