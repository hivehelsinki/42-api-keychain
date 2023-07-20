var express = require("express");
var path = require("path");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const database = require("./config/database");
const init = require("./config/init");

var indexRouter = require("./routes/index");
var healthRouter = require("./routes/health");
var keysRouter = require("./routes/keys");
var settingsRouter = require("./routes/settings");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/health", healthRouter);
app.use("/keys", keysRouter);
app.use("/settings", settingsRouter);

database.connect();
init.initialize();

module.exports = app;
