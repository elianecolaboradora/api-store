import { Router } from "express";
import {ProductManager} from "../services/ProductManager.js"

const productsRouter = Router()
const productsManager = new ProductManager();

productsRouter.get("/", async (request, response) => {

    try{

        const products = await productsManager.getProducts();
        const { limit } = request.query
        if(limit) {
            response.status(200).json(products.slice(0, limit));
        } else {
            response.json(products);
        }

    } catch (error) {
        response.status(500).send("Error interno del servidor");
    }

});
productsRouter.get("/:pid", async (request, response) => {

    try{

        const products = await productsManager.getProducts();
        const { pid } = request.params
        const foundProduct =products.find(product => product.id == pid)
        if(!foundProduct) response.json({messaje:"El producto no existe"})
        response.json(foundProduct)

    }catch(error){
        response.status(404).send("No se entra el path");
    }

});
productsRouter.post("/", async (request, response) => {

    try {
        const newProduct = request.body
        const productoguaradado = await productsManager.addProduct(newProduct);
        if(productoguaradado) response.status(201).json("Producto agregado exitosamente")
        else throw new Error(error.messaje)
    } catch (error) {
        response.status(500).send("No se puede agregar este producto"); 
    }
});
productsRouter.put("/:pid", async (request, response) => {

    try {
        const { pid } = request.params
        const body = request.body
        const productToUpdate = await productsManager.updateProduct(body, pid);
        response.json(productToUpdate)

    } catch (error) {
        response.status(500).send("No se puede agregar este producto"); 
    }
});
productsRouter.delete("/:pid", async (request, response) => {

    try {
        const { pid } = request.params
        const productToDelete = await productsManager.delateProduct(pid);
        response.json({
            messaje:"Producto eliminado",
            deletedData: productToDelete
        })

    } catch (error) {
        response.status(500).send("No se puede eliminar este producto este producto"); 
    }
});

export {productsRouter}