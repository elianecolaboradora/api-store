import mongoosePaginate from "mongoose-paginate-v2"
import { Schema, model, Types } from "mongoose";
const productSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String },
        category: { type: String, default: "Laptops", enum: ["Tablets", "Smartphones", "Laptops", "Smartwatches", "Headphones", "Speakers", "Desktops", "Streaming Devices", "Keyboards", "Accessories", "Virtual Reality", "Fitness", "Cameras", "Gaming", "Televisions", "Soundbars"], index: true },
        price: { type: Number, default: 1 },
        stock: { type: Number, default: 1 },
        photo: { type: String, default: "https://i.postimg.cc/kX8PKZpq/ipad.jpg" },
        onsale: { type: Boolean, default: false },
        owner_id: { type: Types.ObjectId, ref: "Users" },
        state: {
            type: String,
            default: "reserved",
            enum: ["reserved", "paid", "delivered"]
        }
    },
    { timestamps: true }
)
productSchema.plugin(mongoosePaginate)

const ProductModel = model("products", productSchema)

export { ProductModel }