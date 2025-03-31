import { cartManager } from "../../dao/dao.js";
import { CartDto } from "../../dto/cart.dto.js";

class CartRepository {
    readAllCarts = async () => await cartManager.read()
    createCart = async (cartdata) => await cartManager.create(new CartDto(cartdata))    
    readOneCart = async (cid) => await cartManager.readByIdPopulated(cid, "products.product")
    updateCart = async (cid, updateData) => await cartManager.updateById(cid, new CartDto(updateData))
    clearCart = async(idCart) => await cartManager.updateById(idCart, { products: [] });
    
    readCartWithProducts = async (uid, populateFields) => await cartManager.readByIdPopulated(uid, populateFields)
    destroyOneCart = async (uid) => await cartManager.destroyById(uid)
    removeProductFromCart = async(idCart, idProduct) =>await cartManager.updateById(idCart, { $pull: { products: { product: idProduct }}});
    replaceCartProducts  = async(idCart, newProducts) => await cartManager.updateById(idCart,{ products: newProducts }).populate("products.product");
    
}
export const cartRepository = new CartRepository();
