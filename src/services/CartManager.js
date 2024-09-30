import fs from "node:fs/promises";

const __dirname = import.meta.dirname;

export class CartManager{
    constructor(){
        this.product = []
        this.path = __dirname + "/data/carts.json";
    }
    async saveFile() {
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }
    async getCarts(){
        try {

            const productsJson = await fs.readFile(this.path, "utf-8");
            const productsParse = JSON.parse(productsJson);
            this.products = productsParse || [];
            return this.products;

        } catch (error) {

            console.log(`Error: ${error}`);

        }
    }
    async getCartById(idCart){
        try {

            await this.getCarts()
            const productFound = this.products.find(product => product.id == idCart)
            if(!productFound) throw new Error("Not found")
            return productFound

        } catch (error) {
            console.log(error)
        }

    }
    async addCart(){
        try{
            const allCarts = await this.getCarts();
            const newCart ={
                id: allCarts.length + 1,
                products:[]
            }

            this.products.push(newCart);
            await this.saveFile()
            return this.products;
        }catch(error){
            console.log(error)
        }

    }
    async addProduct(idCart, idProduct){
        try{
            const cart = await this.getCartById(idCart)
            if(cart){
                const productExists = cart.products.find(article => article.product == idProduct)
                if(productExists) productExists.quantity++
                else{
                    cart.products.push({
                        product: idProduct,
                        quantity: 1
                    })
                }
                await this.saveFile()
            }
        }catch(error){
            console.log(error)
        }
    }
}