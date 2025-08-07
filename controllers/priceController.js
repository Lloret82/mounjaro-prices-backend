const Price = require("../models/Price");
const provinces = require("../constants/provinces");
// Extract province codes from constants
const provinceCodes = provinces.map((p) => p.match(/\((.*?)\)/)[1]);
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

// GET /prezzi
exports.getPrezzi = async (req, res) => {
  try {
    const prezzi = await Price.find().sort({ data: -1 });
    res.json(prezzi);
  } catch (err) {
    console.error("ERRORE getPrezzi:", err);
    res.status(500).json({ error: "Errore nel recupero prezzi" });
  }
};

// POST /prezzi
exports.createPrezzo = async (req, res) => {
  try {
    const { farmacia, indirizzo, cap, citta, provincia, prodotto, prezzo } =
      req.body;

    // Validate provincia code
    if (!provinceCodes.includes(provincia.toUpperCase())) {
      return res.status(400).json({ error: "Codice provincia non valido" });
    }

    // Geocoding address
    const fullAddress = `${indirizzo}, ${cap} ${citta}, ${provincia}, Italia`;
    const geoResponse = await client.geocode({
      params: { address: fullAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });

    if (!geoResponse.data.results.length) {
      return res.status(400).json({ error: "Indirizzo non trovato" });
    }

    const { lat, lng } = geoResponse.data.results[0].geometry.location;

    // Create document
    const nuovoPrezzo = await Price.create({
      farmacia,
      indirizzo,
      cap,
      citta,
      provincia: provincia.toUpperCase(),
      prodotto,
      prezzo,
      lat,
      lng,
    });

    res.status(201).json(nuovoPrezzo);
  } catch (err) {
    console.error("❌ ERRORE createPrezzo:", err);
    res.status(500).json({ error: "Errore nel salvataggio prezzo" });
  }
};
