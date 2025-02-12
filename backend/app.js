const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes"); 
const auth = require("./middleware/auth"); 
dotenv.config(); // Charger les variables d'environnement

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion réussie à MongoDB"))
  .catch(err => console.log("Erreur de connexion à MongoDB :", err));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API !");
});

module.exports = app; 
