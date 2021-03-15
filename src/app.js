import "dotenv/config";

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import("./configs/database");
import("./models");
import { logRequest, logError } from "./services/logger";
import { limiter } from "./services/limiter";

import authRoute from "./routes/auth";

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(require("express-status-monitor")());
app.use(limiter);
app.use(logRequest);
app.use(logError);
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("api started port", process.env.PORT);
});
