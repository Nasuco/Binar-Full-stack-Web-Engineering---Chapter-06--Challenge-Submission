/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const { urlencoded } = require("express");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("../config/routes");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "./views");
const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());
app.use(express(urlencoded({ extended: true })));

app.set("views", viewsDir);
app.set("view engine", "ejs");

app.use(express.static(publicDir));

/** Install Router */
app.use(router);

module.exports = app;
