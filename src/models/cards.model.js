import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
            },

        }
    ],
    user_id:{
        type: String,
        require: true
    },
    state:{
        type: String,
        default: "reserved", enum: ["reserved", "paid", "delivered"]  
    }
},{ versionKey: false })

cardSchema.pre("findOne", function(next){
    this.populate("products.product")
    next()
})

const CartModel = mongoose.model("Carts", cardSchema)

export {CartModel}
