// Importer le modèle User
const User = require("../models/User");

// Middleware pour vérifier si l'utilisateur est un administrateur
const isAdmin = async (req, res, next) => {
  try {
    // Assurer que req.user contient un ID valide
    const userId = req.user;  // Assurer que req.user est l'ID de l'utilisateur
    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    // Recherche de l'utilisateur dans la base de données avec son ID
    const user = await User.findById(userId);

    // Vérifier si l'utilisateur existe et si son rôle est admin
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Accès interdit : utilisateur non administrateur" });
    }

    // L'utilisateur est un admin, on continue
    next();
  } catch (error) {
    console.error("Erreur dans le middleware isAdmin :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = isAdmin;