const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définition du schéma
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, enum:['admin','user'], default:'user'},

  skills: [
    {
      titre: { type: String, required: true },
      categorie: { type: String, required: true },
      niveau: { type: String, enum: ['débutant', 'intermédiaire', 'expert'], required: true },
      image: { type: String, required: false },
    }
  ],

  settings: {
    preferences: {
      theme: { type: String, default: 'light' }, // Exemple de préférence (thème)
    },
    cookiesAccepted: { 
      type: Boolean, 
      default: false // Indique si l'utilisateur a accepté les cookies
    }
  }
},
{timestamps: true});


// Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified(`password`)) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model(`User`, userSchema);
