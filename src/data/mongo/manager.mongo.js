import { CartModel } from "../models/cards.model.js";
import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/users.model.js"

class Manager {
    constructor(model) {
        this.model = model;
    }
    create = async (data) => await this.model.create(data);
    read = async (filter) => await this.model.find(filter).lean();
    readDocBD =  (filter) => this.model.find(filter);
    readBy = async (data) => await this.model.findOne(data).lean();
    readById = async (id) => await this.model.findOne({ _id: id }).lean();
    updateById = async (id, data) => await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
    destroyById = async (id) => await this.model.findOneAndDelete({ _id: id });
    countDocuments = async (filter) => await this.model.countDocuments(filter)
    readByIdPopulated = async (id, populateFields) => await this.model.findById(id).populate(populateFields).lean();
}

const usersManager = new Manager(UserModel);
const productsManager = new Manager(ProductModel);
const cartManager = new Manager(CartModel);

export {
    Manager,
    usersManager,
    productsManager,
    cartManager
}