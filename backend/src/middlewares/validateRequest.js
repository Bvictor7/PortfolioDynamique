// Importer le module express-validator
const { validationResult } = require("express-validator");

exports.validateRequest = (req, res, next) => {
  // Valider les données de la requête
  const errors = validationResult(req);

  // Si les données sont invalides, renvoyer une erreur
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};