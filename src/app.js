import express from "express";
import { engine } from "express-handlebars";
import { router } from "./routes/index.js";
import { createServer } from 'node:http';
import path from "node:path";
import { httpServerIo } from "./realtimeServer.js";
import { viewsRouter } from "./routes/views.router.js";
const __dirname = import.meta.dirname;

const app = express()
const httpServer = createServer(app)
const PORT = 8080

app.use(express.json());

app.use("/api", router)
app.use("/", viewsRouter)
app.use(express.static(path.join(__dirname, "public")))

// ---- Handlebars ----
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

httpServer.listen(PORT, () => {
    console.log('Mi port ' + PORT);
});
/* app.listen(PORT, () => {
    console.log('Mi port ' + PORT);
}); */

httpServerIo(httpServer)