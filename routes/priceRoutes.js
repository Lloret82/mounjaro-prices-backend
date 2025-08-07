const express = require("express");
const router = express.Router();
const { getPrezzi, createPrezzo } = require("../controllers/priceController");

// Restituisce tutti i prezzi (ordinati per data decrescente)
router.get("/", getPrezzi);

// Riceve un nuovo prezzo, geocodifica e salva lat/lng
router.post("/", createPrezzo);

module.exports = router;
