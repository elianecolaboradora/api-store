import { cartService } from "../services/cart.service.js";
import { setCartByRole } from "../utils/setCartByRole.util.js";
import { setUserByRole } from "../utils/setUserByRole.utils.js";

const readAllCart = async (req, res, next) => {
    try {
        const carts = await cartService.readAllCart();
        return res.json200(carts, "read all carts")
    } catch (error) {
        next(error)
    }
}

const createCart = async (req, res, next) => {
    try {
        const { _id } = req.user
        if (!_id) res.json400("You need to log in")
        const cartProperties = {
            owner_id: _id
        }
        const newCart = await cartService.createCart(cartProperties);
        return res.json201(newCart, "Cart created")
    } catch (error) {
        next(error)
    }
}

const readOneCart = async (req, res, next) => {
    try {
        const { role, _id } = req.user
        const { cid } = req.params;
        const readOneCart = async () => await cartService.readOneCart(cid)
        const cart_req = await setCartByRole(role, cid, _id, res, readOneCart);
        return res.json200(cart_req, "read cart")
    } catch (error) {
        next(error)
    }
}

const addOneProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartService.addOneProductFromCart(cid, pid);
        return res.json200(updatedCart, "product added to cart")
    } catch (error) {
        next(error)
    }
}
const deleteOneProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartService.deleteOneProductFromCart(cid, pid);
        return res.json200(updatedCart, "one product removed from cart")
    } catch (error) {
        next(error)
    }
}

const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartService.deleteProductFromCart(cid, pid);
        return res.json200(updatedCart, "product removed from cart")
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const clearCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const updatedCart = await cartService.clearCart(cid);
        return res.json201(updatedCart, "cart cleaned")
    } catch (error) {
        next(error)
    }
}
const destroyCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const updatedCart = await cartService.destroyCart(cid);
        return res.json201(updatedCart, "Cart removed")
    } catch (error) {
        next(error)
    }
}
export {
    readAllCart,
    readOneCart,
    createCart,
    addOneProductFromCart,
    deleteOneProductFromCart,
    deleteProductFromCart,
    clearCart,
    destroyCart
}