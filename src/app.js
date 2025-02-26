import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"
import { engine } from "express-handlebars";
import { router } from "./routes/index.js";
import { createServer } from 'node:http';
import path from "node:path";
import { httpServerIo } from "./realtimeServer.js";
import { viewsRouter } from "./routes/views.router.js";
import "./dataBase.js"

const __dirname = import.meta.dirname;

const app = express()
const httpServer = createServer(app)
const PORT = 8080

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(session({
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

app.use("/api", router)
app.use("/", viewsRouter)

// ---- Handlebars ----
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

httpServer.listen(PORT, () => {
    console.log('Mi port ' + PORT);
});

httpServerIo(httpServer)