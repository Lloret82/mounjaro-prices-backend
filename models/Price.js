const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  farmacia: { type: String, required: true },
  indirizzo: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  prodotto: { type: String, required: true },
  prezzo: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  fonte: { type: String, default: "utente" },
});

module.exports = mongoose.model("Price", PriceSchema);
