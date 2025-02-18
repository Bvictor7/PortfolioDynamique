const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

// Fonction pour créer un access token
const createAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

// Fonction pour créer un refresh token
const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Récuperer les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: `Erreur lors de la récupération des utilisateurs`,
      error,
    });
  }
};

// Login (génère un access token et un refresh token)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    
    if (!passMatch) {
      return res.status(404).json({ message: `Utilisateur non trouvé` });
    }

    // Créer les tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // Stocker le refresh token dans un cookie sécurisé
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Le cookie ne peut être accédé que par le serveur
      secure: process.env.NODE_ENV === "production", // Secure en production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
    });

    res.status(200).json({ success: true, accessToken }); // Retourner le access token
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la connexion`, error });
  }
};

// Rafraîchir l'access token à l'aide du refresh token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token manquant" });
    }

    // Vérifie le refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token invalide" });
      }

      // Créer un nouveau access token
      const newAccessToken = createAccessToken(user._id);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // Supprimer le refresh token du cookie
    res.clearCookie("refreshToken");
    res.status(200).json({ message: `Utilisateur déconnecté` });
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la déconnexion`, error });
  }
};

// Créer un utilisateur
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "L'utilisateur existe déjà" });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      const token = createAccessToken(newUser._id);
  
      res.status(201).json({ success: true, token, userId: newUser._id });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  };

  exports.removeUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Vérifie si l'utilisateur existe avant de tenter de le supprimer
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      // Si l'utilisateur existe, on le supprime
      await User.findByIdAndDelete(id);
  
      // Répondre après la suppression
      res.status(200).json({ message: "Utilisateur supprimé", user });
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", err });
    }
  };
  
// Enregistrer un utilisateur (même chose que createUser)
exports.registerUser = exports.createUser;

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ message: "Utilisateur mis à jour", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error });
  }
};

// Supprimer un utilisateur (même chose que removeUser)
exports.deleteUser = exports.removeUser;
