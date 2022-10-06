const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/ranking", (req, res) => {
  res.send("test");
});

module.exports = router;
