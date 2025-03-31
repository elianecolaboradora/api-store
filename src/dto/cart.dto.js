import crypto from "crypto"
import argsUtils from "../utils/args.utils.js";

const { pers } = argsUtils

export class CartDto {
    constructor(data){
        this.products = data.products
        this.state = data.state            
        this.owner_id= data.owner_id
        if(pers !== "mongo"){
            this._id = crypto.randomBytes(12).toString("hex")
            this.createAt = new Date()
            this.updateAt = new Date()
        }
    }
}