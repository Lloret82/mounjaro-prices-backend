const express = require("express");
const router = express.Router();
const { getPrezzi, createPrezzo } = require("../controllers/priceController");

router.get("/", getPrezzi);
router.post("/", createPrezzo);

module.exports = router;
