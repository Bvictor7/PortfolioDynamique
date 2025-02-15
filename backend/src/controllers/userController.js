const User = require("../models/User");
const connectDB = require("../config/db");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  return token
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

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!passMatch) {
      res.status(404).json({ message: `Utilisateur non trouvé` });
    } else {
      const token = createToken(user._id);
      res.status(200).json({ success: true, token });
    }
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la connexion`, error });
  }
};

//Log out
exports.logout = async (req, res) => {
  try {
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
        return res.status(400).json({ message: "L'utilisateur existe dejà" });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      const token = createToken(newUser._id);
  
      res.status(201).json({ success: true, token, userId: newUser._id });
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de utilisateur" });
    }
  };

// Supprimer un utilisateur
exports.removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `Utilisateur supprimé`, user });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Erreur lors de la suppression de l'utilisateur`, err });
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

