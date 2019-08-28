const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const locus = require("locus");
var map = new Map();
router.get("/", (req, res) => {
  res.render("landingPage");
});

module.exports = router;
