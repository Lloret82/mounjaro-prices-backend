const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connesso a MongoDB");
  } catch (err) {
    console.error("❌ Errore connessione DB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
