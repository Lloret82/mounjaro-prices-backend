require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const priceRoutes = require("./routes/priceRoutes");

const app = express();

// Middleware base
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Rotta test
app.get("/status", (req, res) => {
  res.json({ status: "API online" });
});

// Rotte prezzi
app.use("/prezzi", priceRoutes);

// Middleware errori
app.use(errorHandler);

// Avvio server + connessione DB
connectDB();
app.listen(process.env.PORT || 5001, "0.0.0.0", () => {
  console.log(
    `🚀 Server avviato su http://localhost:${process.env.PORT || 5000}`
  );
});
