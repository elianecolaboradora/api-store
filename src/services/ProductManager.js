import fs from "node:fs/promises";

const __dirname = import.meta.dirname;

export class ProductManager {
    constructor(){
        this.products = []
        this.path = __dirname + "/data/products.json";
    }
    async saveFile() {
        await fs.writeFile(this.path, JSON.stringify(this.products));
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
    async addProduct(newProduct){
        try{
            await this.getProducts();

            const productFound = this.products.filter(product => product.code === newProduct.code)
            if(productFound.length !== 0)  throw new Error(`ya exite ese producto`)

            const valuesNewProduct = Object.values(newProduct)
            if (valuesNewProduct.includes(undefined)) throw new Error("Todos los datos son obligatorios");

            newProduct.id = this.products.length + 1

            this.products.push(newProduct);
            await this.saveFile()

            return this.products;
        }catch(error){
            console.log(error)
        }

    }
    async updateProduct(newValues, idProduct){
        try{
            await this.getProducts();
            let product = await this.getProductById(idProduct)
            const { title, description, price, img, code, stock } = newValues
            const changeProduct = {
                title,
                description,
                price,
                img,
                code,
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
    async delateProduct(idProduct){
        try{
            const productToRemove = await this.getProductById(idProduct)
            this.products = this.products.filter((product) => product.id !== productToRemove.id);
            await this.saveFile()
        }catch(error){
            console.log(error)
        }
    }

}
