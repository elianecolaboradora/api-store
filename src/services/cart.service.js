import { cartRepository } from "../data/repositories/cart.repository.js";
import { errorHandler } from "../middleware/errorHandler.mid.js";
import { CustomError } from "../utils/customError.util.js";

class CartService {
    readAllCart = async () => {
        const carts = await cartRepository.readAllCarts();
        return carts;
    }

    createCart = async (cartProperties) => {
        return await cartRepository.createCart(cartProperties);
    }

    readOneCart = async (cid) => {
        const cart = await cartRepository.readOneCart(cid);
        return cart;
    }

    addOneProductFromCart = async (cid, pid) => {

        const cart = await cartRepository.readOneCart(cid);
        const existingProduct = cart.products.find(p => {
            return p.product._id.toString() === pid
        });
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        const updatedCart = await cartRepository.updateCart(cid, cart);
        return updatedCart;
    }

    deleteOneProductFromCart = async (cid, pid) => {

        const cart = await cartRepository.readOneCart(cid);
        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);

        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
            const updatedCart = await cartRepository.updateCart(cid, cart);
            return updatedCart;
        } else {
            await this.deleteProductFromCart(cid, pid);
        }

        return await cartRepository.readOneCart(cid);
    }

    deleteProductFromCart = async (cid, pid) => {
        const deleteCart = await cartRepository.removeProductFromCart(cid, pid);
        if (!deleteCart) throw new Error("Carrito no encontrado");
        return deleteCart;
    }

    clearCart = async(idCart) => {
        const updatedCart = await cartRepository.clearCart(idCart);
        return updatedCart;
    }
    destroyCart = async(idCart) => {
        const updatedCart = await cartRepository.destroyOneCart(idCart);
        return updatedCart;
    }

}

export const cartService = new CartService();