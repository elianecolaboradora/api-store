import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    img:{
        type: String
    },
    code: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
})
productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("products", productSchema)

export {ProductModel}