
import { CartModel } from "../models/cards.model.js";


export class CartManager{
    constructor(){ }

    async getCartsFT(){
        try { return await CartModel.find().lean() }
        catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    async getCartFT(idCart){
        try {
            const cart = await CartModel.findById(idCart).populate("products.product").lean();
            if(!cart) throw new Error("Carrito no encontrado");
            return cart
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    async addCartFT(user_id){
        try{
            console.log("addCartFT"+ user_id)
            return await CartModel.create({
                products:[],
                user_id
            })
        }catch(error){
            console.log(error)
        }
    }
    async getCartByIdFT(idCart){
        try {
            return await CartModel.findById(idCart)
        } catch (error) {
            console.log(error)
        }
    }
    async addProductFT(idCart, idProduct){
        try{
            const cart = await CartModel.findById(idCart)
            if(!cart) throw new Error("Carrito no encontrado");
            const existingProduct = cart.products.find(product => product.product._id == idProduct);

            if (existingProduct) existingProduct.quantity += 1;
            else cart.products.push({ product: idProduct, quantity: 1 });

            await cart.save();
            return await CartModel.findById(idCart).populate("products.product");

        }catch(error){
            console.log(error)
        }
    }
    async deleteProductFT(idCart, idProduct){

        try {
            const deleteCart = await CartModel.findByIdAndUpdate(
                idCart,
                {
                    $pull: {
                        products: {
                            product: idProduct
                        }
                    }
                },
                { new: true }
            ).populate("products.product");
            if (!deleteCart) throw new Error("Carrito no encontrado");
            return deleteCart;
        } catch (error) {
            throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
        }
    }
    async updateTheEntireCart(idCart, newProducts) {
        try {
            const updatedCart = await CartModel.findByIdAndUpdate(
                idCart,
                { products: newProducts },
                { new: true }
            ).populate("products.product");

            if (!updatedCart) throw new Error("Carrito no encontrado");
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al actualizar productos del carrito: ${error.message}`);
        }
    }
    async updateProductQuantity(idCart, idProduct, newQuantity) {
        try {


            if (newQuantity < 1) throw new Error("La cantidad debe ser al menos 1");

            const cart = await CartModel.findById(idCart);
            if (!cart) throw new Error("Carrito no encontrado");

            const productInCart = cart.products.find(item => item.product._id == idProduct);
            if (!productInCart) throw new Error("Producto no encontrado en el carrito");

            productInCart.quantity = newQuantity;
            await cart.save();

            return await CartModel.findById(idCart).populate("products.product");
        } catch (error) {
            throw new Error(`Error al actualizar la cantidad del producto: ${error.message}`);
        }
    }
    async clearCart(idCart) {
        try {
            const updatedCart = await CartModel.findByIdAndUpdate(
                idCart,
                { products: [] },
                { new: true }
            );

            if (!updatedCart) throw new Error("Carrito no encontrado");
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al vaciar el carrito: ${error.message}`);
        }
    }
}