import  argsUtils from "../utils/args.utils.js"
import { dbConnect } from "../utils/bdConnect.util.js";

const { pers } = argsUtils;
let dao = {}

switch (pers) {
    case "fs": {
        const { productsManager, usersManager, cartManager } = await import("../data/fs/manager.fs.js")
        dao = { productsManager, usersManager, cartManager }
        console.log("fs data base")
    }
    break;
    default: {
        await dbConnect()
        const { productsManager, usersManager, cartManager } = await import("../data/mongo/manager.mongo.js")
        dao = { productsManager, usersManager, cartManager }
        console.log("mongo data base")
    }
    break;
}
const { productsManager, usersManager, cartManager } = dao

export { productsManager, usersManager, cartManager, dao }