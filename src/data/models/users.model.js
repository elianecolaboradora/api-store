import { Schema, model } from "mongoose";

const collection = "Users";
const schema = new Schema(
	{
		name: { type: String },
        date: {type: Date},
        email: { type: String, require: true, index: true, unique: true },
        password: { type: String, require: true },
        role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
        avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"},
        verifyCode: {type:String, default: true},
        verify:{type: Boolean, default:false}

	},
	{ timestamps: true }
);

const UserModel = model(collection, schema);
export { UserModel };
