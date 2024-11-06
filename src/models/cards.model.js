import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
            }
        }
    ]
},{ versionKey: false })

cardSchema.pre("findOne", function(next){
    this.populate("products.product")
    next()
})

const CartModel = mongoose.model("cards", cardSchema)

export {CartModel}
