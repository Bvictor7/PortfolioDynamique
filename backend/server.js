require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const skillRoutes = require("./src/routes/skillRoutes")

connectDB();

const app = express();

const corsParams = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsParams));

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/skills", skillRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur tourne sous http://localhost:${PORT}`);
});
