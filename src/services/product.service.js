import { productRepository } from "../data/repositories/products.repository.js";
import { CustomError } from "../utils/customError.util.js";

class ProductService {

    async readAllProducts({ limit = 10, page = 1, sort, query }) {
        try {

            const { products, totalProducts } = await productRepository.readAllProducts({
                query, sort, limit, page
            });

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;

            function createURL(pageNum) {
                const params = new URLSearchParams({ limit, page: pageNum });
                if (sort) params.append("sort", sort);
                if (query) params.append("query", query);
                return `/products?${params.toString()}`;
            }

            return {
                status: "success",
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? createURL(prevPage) : null,
                nextLink: hasNextPage ? createURL(nextPage) : null,
            };

        } catch (error) {
            console.log(error)
            throw new CustomError(`Error in obtaining products: ${error.message}`, 500);
        }
    }

    async readOneProduct(pid) {
        try {
            return await productRepository.readOneProduct(pid)
        } catch (error) {
            throw new CustomError(`Error obtaining product: ${error.message}`, 500);
        }

    }

    async createProduct(newProduct) {

        const filterProduct = { $or: [{ title: newProduct.title }] };
        const theProductExists = await productRepository.findOneBy(filterProduct);

        if (theProductExists) throw new CustomError("Product title already exists", 409);

        return await productRepository.createProduct(newProduct);

    }

    async updateOneProduct(pid, newValues) {

        console.log(newValues)
        const product = await productRepository.readOneProduct(pid);
        if (!product) throw new CustomError("Product no Content", 204);


        const updatedProduct = await productRepository.updateOneProduct(pid, newValues);
        return updatedProduct;

    }

    async destroyOneProduct(pid) {

        const deletedProduct = await productRepository.destroyOneProduct(pid);
        if (!deletedProduct) throw new CustomError("Product not found");
        return deletedProduct;
    }
}

export const productsService = new ProductService()
