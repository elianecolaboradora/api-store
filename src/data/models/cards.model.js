import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";

const cardSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        ],
        default: []
    },
    owner_id: { type: Types.ObjectId, ref: "Users" },
    state:{
        type: String,
        default: "reserved",
        enum: ["reserved", "paid", "delivered"]  
    }
},{ versionKey: false })

cardSchema.pre("findOne", function(next){
    this.populate("products.product")
    next()
})

const CartModel = model("Carts", cardSchema)

export {CartModel}
