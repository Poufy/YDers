const express = require("express");
const app = express();
const mongoUrl = require("./config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const landingPageRoute = require("./api/routes/landingPage");

/* MIDDLEWEAR */
app.use(express.static(__dirname + "/public"));
app.use("/", landingPageRoute); //Any request to / will be handled by the landingPageRoute
app.set("view engine", "ejs");

module.exports = app;
