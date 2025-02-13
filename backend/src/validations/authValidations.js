// Importer express-validator
const { body, param } = require("express-validator");

// Validation pour l'endpoint POST /register
// Validation pour la creation d'un utilisateur
exports.validateRegisterUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 3 })
    .withMessage("Le nom doit avoir au moins 3 caractères")
    .isLength({ max: 7 })
    .withMessage("wesh le nom doit pas avoir plus que 7 caractères frerot"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Mot de passe manquant")
    .isLength({ min: 6, max: 200 })
    .withMessage("Le mot de passe doit contenir de 6 à 200 caractères"),
];

exports.validateUpdateUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant/invalide"),

  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .trim()
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit avoir au moins 6 caractères")
    .isLength({ max: 200 })
    .withMessage("Le mot de passe doit avoir au plus 200 caractères"),
];

exports.validateDeleteUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant / invalide"),
];
