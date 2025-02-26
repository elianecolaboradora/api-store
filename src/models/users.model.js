import { Schema, model } from "mongoose";

const collection = "Users";
const schema = new Schema(
	{
		photo: {
			type: String,
			default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
		},
		role: {
			type: String,
			default: "USER", enum: ["USER", "ADMIN"]
		},
		email: {
			type: String,
			required: true,
			index: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
	},
	{ timestamps: true }
);

const User = model(collection, schema);
export { User };
