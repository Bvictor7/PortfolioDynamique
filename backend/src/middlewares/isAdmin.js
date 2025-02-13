// Importer le modèle User
const User = require("../models/User");

// middlewares pour vérifier si l'utilisateur est un administrateur
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Non autorisé" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAdmin;
