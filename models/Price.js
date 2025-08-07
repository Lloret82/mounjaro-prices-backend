const mongoose = require("mongoose");
const provinceCodes = require("../constants/provinces").map(
  (p) => p.match(/\((.*?)\)/)[1]
);

const priceSchema = new mongoose.Schema({
  farmacia: { type: String, required: true },
  indirizzo: { type: String, required: true },
  cap: { type: String, required: true },
  citta: { type: String, required: true },
  provincia: {
    type: String,
    enum: provinceCodes,
    required: true,
    uppercase: true,
    trim: true,
  },
  prodotto: { type: String, required: true },
  prezzo: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  fonte: { type: String, default: "utente" },
});

module.exports = mongoose.model("Price", priceSchema);
