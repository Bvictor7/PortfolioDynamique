const mongoose = require("mongoose");

// Définition du schéma
const adSchema = new mongoose.Schema({
  categorie: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  public_id: { type: String },
  urlImage: { type: String },
  
});

module.exports = mongoose.model("Ad", adSchema);