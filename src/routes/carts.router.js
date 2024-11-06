import { Router } from "express";
import { CartManager } from "../services/CartManager.js";

const cartRouter = Router()
const cartManager = new CartManager();

cartRouter.get("/", async (request, response) => {

    try{
        const products = await cartManager.getCartsFT();
        return response.json(products);

    } catch (error) {
        response.status(500).send("Error interno del servidor");
    }

});

cartRouter.get("/:cid", async (request, response) => {

    try{
        const { cid } = request.params;
        const allProducts = await cartManager.getCartFT(cid);
        const cartProducts = allProducts.products;

        // Envía 'cartProducts' como parte de un objeto para Handlebars
        response.render('shoppingCart', { cartProducts });
    }catch(error){
        response.status(404).send("No se entra el carrito");
    }

});

cartRouter.post("/", async (request, response) => {

    try {
        const productoguaradado = await cartManager.addCartFT();
        if(productoguaradado) response.status(201).send(productoguaradado._id.toString())
    } catch (error) {
        response.status(500).send("No se puede agregar este producto"); 
    }
});

cartRouter.post("/:cid/product/:pid", async (request, response) => {

    try{
        const { cid, pid } = request.params
        const cart = await cartManager.addProductFT(cid, pid);
        console.log(cart)
        return response.json(cart);

    }catch(error){
        console.log(error)
        response.status(500).send("Error al agregar productos al carrito");
    }

});

cartRouter.delete("/:cid/product/:pid", async (request, response) => {

    try{
        try {
            const { cid, pid } = request.params;
            const deleteCart = await cartManager.deleteProductFT(cid, pid);
            return response.json(deleteCart);
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            response.status(500).json({ error: error.message });
        }

    }catch(error){
        console.log(error)
    }

});

// actualizar con arreglo -------------------
// ejemplo del cuerpo
/* {
    "products": [
        { "product": "64f123abc123d4f5e6789001", "quantity": 3 },
        { "product": "64f123abc123d4f5e6789002", "quantity": 1 }
    ]
} */
cartRouter.put("/:cid", async (request, response) => {
    try {
        const { cid } = request.params;
        const newProducts = request.body.products;

        if (!Array.isArray(newProducts)) {
            return response.status(400).json({ error: "Error, la solicitud debe contener un arreglo de productos en la propiedad products." });
        }

        const updatedCart = await cartManager.updateTheEntireCart(cid, newProducts);
        return response.json(updatedCart);

    } catch (error) {
        console.error("Error al actualizar productos los productos:", error.message);
        response.status(500).json({ error: error.message });
    }
});

// actualizar la cantidad --------------------------------------
// ejemplo del cuerpo
/* {
    "quantity": 5
} */
cartRouter.put("/:cid/products/:pid", async (request, response) => {
    try {
        const { cid, pid } = request.params;
        const { quantity } = request.body;

        if (typeof quantity !== 'number' || quantity < 1) {
            return response.status(400).json({ error: "La cantidad debe ser un número mayor o igual a 1" });
        }

        const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
        return response.json(updatedCart);

    } catch (error) {
        console.error("Error al actualizar la cantidad del producto en el carrito:", error.message);
        response.status(500).json({ error: error.message });
    }
});
cartRouter.delete("/:cid", async (request, response) => {
    try {
        const { cid } = request.params;

        const clearedCart = await cartManager.clearCart(cid);
        return response.json(clearedCart);

    } catch (error) {
        console.error("Error al vaciar el carrito:", error.message);
        response.status(500).json({ error: error.message });
    }
});
export {cartRouter}
