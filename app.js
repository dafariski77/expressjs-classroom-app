const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const classRouter = require("./app/Routes/class.routes");
const erroHandlerMiddleware = require("./app/Middlewares/handlerError.middleware");
const notFoundMiddleware = require("./app/Middlewares/notFound.middleware");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(classRouter);

app.use(erroHandlerMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
