process.loadEnvFile(".env")
/* process.loadEnvFile(".envexample") */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
    .then(()=> console.log("Conectado a la db"))
    .catch((error)=> console.log( error))

