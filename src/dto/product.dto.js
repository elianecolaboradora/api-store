import crypto from "crypto"
import argsUtils from "../../utils/args.utils.js";

const { pers } = argsUtils

export class ProductDto {
    constructor(data) {

        this.title = data.title
        this.description = data.description
        this.category = data.category || "Laptops"
        this.photo = data.image || "https://i.postimg.cc/kX8PKZpq/ipad.jpg"
        this.price = data.price || 10
        this.stock = data.stock || 10
        this.onsale = data.onsale || false
        this.owner_id = data.owner_id
        this.state = data.state
        if(pers !== "mongo"){
            this._id = crypto.randomBytes(12).toString("hex")
            this.createAt = new Date()
            this.updateAt = new Date()
        }
    }

}