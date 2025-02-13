const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")

// controllers
const {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    removeSkill
  } = require("../controllers/skillController");

  router.post("/", auth, createSkill);
  router.get("/", getAllSkills);
  router.get("/:id", getSkillById);
  router.put("/:id", auth, updateSkill);
  router.delete("/:id", auth, removeSkill);

module.exports = router;