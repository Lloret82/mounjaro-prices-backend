const Price = require("../models/Price");

// GET /prezzi
const getPrezzi = async (req, res) => {
  try {
    const prezzi = await Price.find();
    res.json(prezzi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /prezzi
const createPrezzo = async (req, res) => {
  try {
    const nuovoPrezzo = new Price(req.body);
    await nuovoPrezzo.save();
    res.status(201).json(nuovoPrezzo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getPrezzi, createPrezzo };
