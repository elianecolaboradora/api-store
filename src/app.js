import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
import path from "node:path";
import argsUtils from "./utils/args.utils.js";
import { engine } from "express-handlebars";
import { errorHandler } from "./middleware/errorHandler.mid.js";
import { pathHadler } from "./middleware/pathHandler.mid.js";
import  router  from "./routes/index.js";
import { viewsRouter } from "./routes/views.router.js";
import { envpath } from "./utils/env.utils.js";
/* import { viewsRouter } from "./routes/views.router copy.js";
 */
process.loadEnvFile(envpath)
const __dirname = import.meta.dirname;

// ------ SERVER ------
const server = express();
const PORT = argsUtils.p
const ready = async () => console.log("server is ready on PORT " + PORT)
server.listen(PORT, ready)

// ------ MIDDLEWARE ------
server.use(morgan("dev"));
server.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")))
server.use(cookieParser(process.env.COOKIE_KEY));
server.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 24 * 7 * 1000,
        httpOnly: true
    },
    store: new MongoStore({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60 * 60 * 24 * 7
    })
}))
server.use("/api", router)
server.use("/", viewsRouter)
server.use(errorHandler)
server.use(pathHadler)

// ---- HANDLEBARS ----
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));
