const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.token;
    const tokenFromHeader = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"
    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ message: "Token manquant ou non autorisé" });
    }

    console.log("Token reçu : ", token); // Affiche le token pour déboguer

    // Décodage du token sans vérification pour débogage
    const decoded = jwt.decode(token);
    console.log("Payload du token (sans vérification): ", decoded); // Affiche le payload pour déboguer

    if (!decoded || !decoded._id) {
      return res.status(401).json({ message: "Token invalide" });
    }

    // Vérifie si l'ID dans le token est valide en tant qu'ObjectId
    if (!mongoose.Types.ObjectId.isValid(decoded._id)) {
      return res.status(400).json({ message: "ID utilisateur manquant / invalide" });
    }

    // Conversion explicite de l'ID en ObjectId
    const userId = new mongoose.Types.ObjectId(decoded._id);  // Convertir l'ID en ObjectId

    console.log("ID de l'utilisateur à chercher :", userId); // Affiche l'ID pour vérifier si c'est bien l'ID que tu attends

    // Recherche de l'utilisateur par ID
    const user = await User.findById(userId);

    console.log("Utilisateur trouvé :", user); // Affiche l'utilisateur trouvé

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    req.user = user._id; // Ajouter l'ID de l'utilisateur à la requête
    console.log("Utilisateur décodé : ", user); // Affiche l'utilisateur décodé pour déboguer

    next(); // Passer au prochain middleware ou route
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    res.status(401).json({ message: "Erreur d'authentification" });
  }
};

module.exports = protect;
