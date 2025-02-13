const Skills = require("../models/Skills");
const upload = require("../config/upload");

// Créer une nouvelle compétence
exports.createSkill = async (req, res) => {
  try {
    const newSkill = new Skills({
      title: req.body.title,
      category: req.body.category,
      level: req.body.level,
      image: req.file ? req.file.path : "" // On vérifie si l'image est présente
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la compétence", error });
  }
};

// Récupérer toutes les compétences
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des compétences", error });
  }
};

// Récupérer une compétence par son ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la compétence", error });
  }
};

// Mettre à jour une compétence
exports.updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skills.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        level: req.body.level,
        image: req.file ? req.file.path : req.body.image // Si une image est fournie
      },
      { new: true } // Retourner l'objet mis à jour
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la compétence", error });
  }
};

// Supprimer une compétence
exports.removeSkill = async (req, res) => {
  try {
    const deletedSkill = await Skills.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.status(200).json({ message: "Compétence supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la compétence", error });
  }
};
