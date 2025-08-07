const Price = require("../models/Price");
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
    // 1) Log del body
    console.log("🔍 BODY RICEVUTO:", req.body);

    const { farmacia, indirizzo, cap, citta, provincia, prodotto, prezzo } =
      req.body;

    // 2) Verifica env
    console.log(
      "🔑 GOOGLE_MAPS_API_KEY presente?",
      !!process.env.GOOGLE_MAPS_API_KEY
    );

    // 3) Costruisco e loggo l'indirizzo completo
    const fullAddress = `${indirizzo}, ${cap} ${citta}, ${provincia}, Italia`;
    console.log("📍 INDIRIZZO GEOCODING:", fullAddress);

    // 4) Chiamo Google Geocoding API
    const geoResponse = await client.geocode({
      params: { address: fullAddress, key: process.env.GOOGLE_MAPS_API_KEY },
    });
    console.log(
      "📡 RISPOSTA GEOCODING:",
      JSON.stringify(geoResponse.data, null, 2)
    );

    if (!geoResponse.data.results.length) {
      console.warn("⚠️ NESSUN RISULTATO GEOCODING");
      return res.status(400).json({ error: "Indirizzo non trovato" });
    }

    // 5) Estraggo lat/lng e loggo
    const { lat, lng } = geoResponse.data.results[0].geometry.location;
    console.log("✅ COORDINATE RICEVUTE:", { lat, lng });

    // 6) Creo il documento
    const nuovoPrezzo = await Price.create({
      farmacia,
      indirizzo,
      cap,
      citta,
      provincia,
      prodotto,
      prezzo,
      lat,
      lng,
    });

    console.log("💾 Prezzo salvato con ID:", nuovoPrezzo._id);
    return res.status(201).json(nuovoPrezzo);
  } catch (err) {
    console.error("❌ ERRORE createPrezzo:", err);
    return res.status(500).json({ error: "Errore nel salvataggio prezzo" });
  }
};
