import { Server } from "socket.io";
import { ProductManager } from "./services/ProductManager.js";

export function httpServerIo(httpServer){
    const io = new Server(httpServer)


    const manager = new ProductManager("./src/data/productos.json");
    io.on("connection", async (socket) => {
        console.log("cliente conectado:"+ socket.id)
        /* socket.on() */
        socket.on("newProduct", async (produc)=>{
           await manager.addProduct(produc)
           io.emit("products", await manager.getProducts())
        })
        socket.on("idProductDelete", async(id)=>{
            console.log("id delate " +id)
            await manager.delateProduct(id)
            io.emit("products", await manager.getProducts())
        })
    })
}