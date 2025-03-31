import { productsManager } from "../../dao/dao.js";
import { UserDto } from "../../dto/users.dto.js";

class ProductRepository {
    readAllProducts = async ({ query, sort, limit, page }) => {
        const filter = query
            ? { $or: [{ status: query }, { category: query }, { title: query }] }
            : {};

        const sortOption = sort === "asc" ? 1 : sort === "desc" ? -1 : null;

        let queryDB = productsManager.readDocBD(filter).lean();
        if (sortOption) queryDB.sort({ price: sortOption })


        const products = await queryDB
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        const totalProducts = await productsManager.countDocuments(filter);

        return { products, totalProducts };
    };    
    countDocuments = async (filter) => await productsManager.countDocuments(filter)
    readOneProduct = async (pid) => await productsManager.readById(pid)
    findOneBy = async(filter)=> await productsManager.readBy(filter);
    createProduct = async (newProduct) => await productsManager.create(newProduct);
    updateOneProduct = async (pid, updateData) => await productsManager.updateById(pid, updateData);
    readOneProductByEmail = async (email) => await productsManager.readBy({ email })
    destroyOneProduct = async (pid) => await productsManager.destroyById(pid)
}

export const productRepository = new ProductRepository();

