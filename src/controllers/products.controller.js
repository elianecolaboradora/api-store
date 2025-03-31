import { productsService } from "../services/product.service.js";

const readAllProduct = async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query.query;
    const products = await productsService.readAllProducts({ limit, page, sort, query });
    res
        .render("products", {
            status: products.status,
            payload: products.payload,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevLink,
            nextLink: products.nextLink
        })
}

const readOneProduct = async (req, res) => {
    const { pid } = req.params;
    const response = await productsService.readOneProduct(pid)
    if (!response) return res.json404()
    else res.json200(response, "Read by id")
}

const createProduct = async (req, res, next) => {
    try {
        const { _id } = req.user
        const productProperties = req.body
        const newProduct = {
            owner_id: _id,
            ...productProperties
        }
        const createdProduct = await productsService.createProduct(newProduct);
        res.json201(createdProduct, "Product created");
    } catch (error) {
        next(error); // Pasamos el error al middleware de manejo de errores

    }

}

const updateOneProduct = async (req, res) => {
    const { pid } = req.params;
    const newProduct = req.body;
    const response = await productsService.updateOneProduct(pid, newProduct)
    if (!response) res.json404()
    else res.json200(response, "Updated")
}

const destroyOneProduct = async (req, res) => {
    const { pid } = req.params;
    const response = await productsService.destroyOneProduct(pid)
    if (!response) res.json404();
    else res.json200(response);
}

export {
    readAllProduct,
    readOneProduct,
    createProduct,
    updateOneProduct,
    destroyOneProduct
};
