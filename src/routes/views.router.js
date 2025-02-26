import { Router } from "express";
import { ProductManager } from "../services/ProductManager.js";

const viewsRouter = Router()
const productManager = new ProductManager()
viewsRouter.get("/products", async (request, response) => {
    try {

        const limit = Number(request.query.limit) || 10;
        const page = Number(request.query.page) || 1;
        const sort = request.query.sort;
        const query = request.query.query;

        const result = await productManager.getProductsFT({ limit, page, sort, query });

        response.render("index",{
            status: result.status,
            payload: result.payload,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
        });

    } catch (error) {
        console.log(error)
        console.error("Error al obtener productos:", error.message);
        response.status(500).json({ status: 'error', message: error.message });
    }

})

viewsRouter.get("/products/:pid", async (request, response) => {
    try {
        const { pid } = request.params;
        const product = await productManager.getProductByIdFT(pid);
        response.render('productDetail', { product });
    } catch (error) {
        response.status(500).send("Error loading product details");
    }


})

viewsRouter.get("/realtimeproducts", async (req, res) => {

    try{
        const products = await productManager.getProducts();
        res.render("realtimeproducts", {products});


    }catch(error){
        console.log(error)
    }

})

export { viewsRouter }