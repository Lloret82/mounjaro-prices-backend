require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const priceRoutes = require("./routes/priceRoutes");

const app = express();

// 🔥 Middleware globale di logging: registra ogni richiesta
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Body parser
app.use(express.json());

// Route di test
app.get("/status", (req, res) => res.json({ status: "API online" }));

// Route prezzi
app.use("/prezzi", priceRoutes);

// Middleware di gestione errori
app.use(errorHandler);

// Connessione DB e avvio server
connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
