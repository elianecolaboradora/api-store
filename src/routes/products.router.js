import { Router } from "express";
import {ProductManager} from "../services/ProductManager.js"

const productsRouter = Router()
const productsManager = new ProductManager();

//----- router view
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

//----- router view
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

// ---------------------------
productsRouter.post("/", async (request, response) => {

    try {
        const newProduct = request.body;
        const savedProduct = await productsManager.addProductFT(newProduct);
        response.status(201).json({ message: "Product successfully added", product: savedProduct });
    } catch (error) {
        response.status(409).json({ error: error.message });
    }

});

productsRouter.put("/:pid", async (request, response) => {

    try {
        const { pid } = request.params
        const body = request.body
        const productToUpdate = await productsManager.updateProductFT(pid, body );
        response.status(201).json({ message: "product successfully upgraded", product: productToUpdate });

    } catch (error) {
        response.status(500).send("This product cannot be added"); 
    }
});

productsRouter.delete("/:pid", async (request, response) => {
    const { pid } = request.params;
    
    try {
        const deletedProduct = await productsManager.deleteProductFT(pid);
        response.status(200).json({ message: "Product deleted", deletedProduct });
    } catch (error) {
        response.status(500).json({ error: "Error deleting product" });
    }
});

export {productsRouter}