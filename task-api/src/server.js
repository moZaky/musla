import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import mongo from "./loaders/mongo.js";
import * as routes from "./api/index.js";

function setLogger(app) {
    const __dirname = path.resolve();

    var accessLogStream = fs.createWriteStream(
        path.join(__dirname, "access.log"),
        { flags: "a" }
    );
    // setup the logger
    app.use(logger("combined", { stream: accessLogStream }));
}

async function startServer() {
    const app = express();
    const port = 8888;
    setLogger(app);
    // parse url encoded objects- data sent through the url
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors());
      app.use("/", routes.default);
    new mongo();

    app.get(`/status`, (req, res) => {
        res.status(200).send(` API IS UP AND RUNNING ✅ `);
    });
    // catch 404 and forward to error handler

    app.listen(port, (err) => {
        if (err) {
            process.exit(1);
        }
        console.log(`
        ################################################
            🏁  Server listening on port: ${port} 🏁  
        ################################################`);
    });
    app.use((req, res, next) => {
        next();
    });
    app.use(function (req, res, next) {
        next(createError(404));
    });
}
startServer();
