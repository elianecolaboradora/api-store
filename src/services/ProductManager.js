import fs from "node:fs/promises";
import { ProductModel } from "../data/models/product.model.js";
const __dirname = import.meta.dirname;

export class ProductManager {
    getProductsFT = async ({ limit = 10, page = 1, sort, query })=>{
        try {

            const filter = query
            ?
            {
                $or: [
                    { status: query },
                    { category: query }
                ]
            }
            : {};

            const sortOption = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            const productsQuery = ProductModel.find(filter).lean();

            if (sortOption) productsQuery.sort({ price: sortOption })

            const products = await productsQuery
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();

            function createURL(prevOrNext) {
                let URL =`/products?limit=${limit}&page=${prevOrNext}`
                if(!sort && !query) URL
                else if(!sort) URL + `&query=${query}`
                else if(!query) URL + `&sort=${sort}`
                else URL + `&sort=${sort}&query=${query}`
                return URL
            }

            const totalProducts = await ProductModel.countDocuments(filter);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;
            const prevLink = hasPrevPage ? createURL(prevPage) : null;
            const nextLink = hasNextPage ? createURL(nextPage) : null;

            return {
                status: 'success',
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            };

        } catch (error) {
            console.log(error)
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }
    async getProductsFT({ limit = 10, page = 1, sort, query }) {
        try {

            const filter = query
            ?
            {
                $or: [
                    { status: query },
                    { category: query }
                ]
            }
            : {};

            const sortOption = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            const productsQuery = ProductModel.find(filter).lean();

            if (sortOption) productsQuery.sort({ price: sortOption })

            const products = await productsQuery
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();

            function createURL(prevOrNext) {
                let URL =`/products?limit=${limit}&page=${prevOrNext}`
                if(!sort && !query) URL
                else if(!sort) URL + `&query=${query}`
                else if(!query) URL + `&sort=${sort}`
                else URL + `&sort=${sort}&query=${query}`
                return URL
            }

            const totalProducts = await ProductModel.countDocuments(filter);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;
            const prevLink = hasPrevPage ? createURL(prevPage) : null;
            const nextLink = hasNextPage ? createURL(nextPage) : null;

            return {
                status: 'success',
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            };

        } catch (error) {
            console.log(error)
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    async getProducts(){
        try {

            const productsJson = await fs.readFile(this.path, "utf-8");
            const productsParse = JSON.parse(productsJson);
            this.products = productsParse || [];
            return this.products;

        } catch (error) {

            console.log(`Error: ${error}`);

        }
    }
    // file -----------------------------------------
    async getProductById(idProduct){
        try {

            await this.getProducts()
            const productFound = this.products.find(product => product.id == idProduct)
            if(!productFound) throw new Error("Not found")
            return productFound

        } catch (error) {
            console.log(error)
        }

    }
    // DB -------------------------------------------
    async getProductByIdFT(idProduct){
        try {
            return await ProductModel.findById(idProduct).lean()
        } catch (error) {
            console.log(error)
        }

    }

    // file -----------------------------------------
    async addProduct(newProduct){
        try{
            await this.getProducts();

            const productFound = this.products.filter(product => product.code === newProduct.code)
            if(productFound.length !== 0)  throw new Error(`ya exite ese producto`)

            const valuesNewProduct = Object.values(newProduct)
            if (valuesNewProduct.includes(undefined)) throw new Error("Todos los datos son obligatorios");

            const generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)
            /* newProduct.id = this.products.length + 1 */
            newProduct.id = generateId()

            this.products.push(newProduct);
            await this.saveFile()

            return this.products;
        }catch(error){
            console.log(error)
        }

    }
    // DB -------------------------------------------
    async addProductFT(newProduct){
        console.log(newProduct)
        try{
            const filter = {
                $or:[
                    { title: newProduct.title },
                ]
            }

            const theProductExists =await ProductModel.findOne(filter)
            if(theProductExists) throw new Error(`Product title already exists`)
            const keysProduct = ["title"]
            const keysNewProduct = Object.keys(newProduct)
        
            if (JSON.stringify(keysProduct) !== JSON.stringify(keysNewProduct)) {
                throw new Error("The product must include 'title'");
            }

            return await ProductModel.create(newProduct)

        }catch(error){
            throw new Error(error)
        }

    }

    async updateProduct(newValues, idProduct){
        try{
            await this.getProducts();
            let product = await this.getProductById(idProduct)
            const { title, photo, category, price, stock } = newValues
            const changeProduct = {
                title,
                photo,
                category,
                price,
                stock,
            }
            const valueChangeProduct = Object.entries(changeProduct)
            const changesOtherThanUndefined =Object.fromEntries(valueChangeProduct.filter(field => field[1] !== undefined))
            const changedProduct = {
                ...product,
                ...changesOtherThanUndefined
            }
            this.products.splice(changedProduct.id-1,1,changedProduct)
            await this.saveFile()
            return changedProduct;
        }catch(error){
            console.log(error)
        }
    }
    async updateProductFT(idProduct, newValues) {
    try {
        const product = await ProductModel.findById(idProduct);
        if (!product) throw new Error("Product not found");

        const validUpdates = {};
        for (const key in newValues) {
            if (newValues[key] !== undefined) {
                validUpdates[key] = newValues[key];
            }
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(idProduct, validUpdates, { new: true });
        return updatedProduct;

    } catch (error) {
        throw new Error(error);
    }
}
    async delateProduct(idProduct){
        try{
            const productToRemove = await this.getProductById(idProduct)
            this.products = this.products.filter((product) => product.id !== productToRemove.id);
            await this.saveFile()
        }catch(error){
            console.log(error)
        }
    }
    async deleteProductFT(idProduct) {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(idProduct);
            
            if (!deletedProduct) {
                throw new Error("Product not found");
            }
    
            return deletedProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

}
