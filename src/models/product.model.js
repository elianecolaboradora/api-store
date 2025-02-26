import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    photo: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-66aQDAgas1fy6b-MQTe1aQx9ExPRWsGXiw&s"
    },
    category: {
        type: String,
        default: "General",
        enum: ["General", "Abarrotes", "Hogar", "Electrónica", "Moda"]  
    },
    price: {
        type: Number,
        default: 1
    },
    stock: {
        type: Number,
        default: 1
    },
    state: {
        type: String,
        default: "reserved",
        enum: ["reserved", "paid", "delivered"]  
    }
})
productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("Products", productSchema)

export {ProductModel}