import { Router } from "express";
import { ProductManager } from "../services/ProductManager.js";
import { productsService } from "../services/product.service.js";

const viewsRouter = Router()

const renderLogin = (req, res) => res.render("index")
const renderRegister = (req, res) => res.render("register")
const renderverifyCode = (req, res) => res.render("verifyCode")
const renderProducts = (req, res) => res.render("products")


viewsRouter.get("/", renderLogin)
viewsRouter.get("/register", renderRegister)
viewsRouter.get("/verifyCode", renderverifyCode)
viewsRouter.get("/products", renderProducts)
/* viewsRouter.get("/test", (req, res) => {
    res.render("index", { message: "Hola, Handlebars funciona!" });
});

viewsRouter.get("/products", async (request, response) => {
    try {

        const limit = Number(request.query.limit) || 10;
        const page = Number(request.query.page) || 1;
        const sort = request.query.sort;
        const query = request.query.query;

        const result = await productsService.readAllProducts({ limit, page, sort, query });

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
        const product = await productsService.readOneProduct(pid);
        response.render('productDetail', { product });
    } catch (error) {
        response.status(500).send("Error loading product details");
    }


}) */


export { viewsRouter }