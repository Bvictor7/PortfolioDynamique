const express = require("express");
const router = express.Router();
const Skills = require("../models/Skills");
const upload = require("../config/upload");
const auth = require("../middleware/auth");

router.post("/", auth, upload.single("image"), async (req, res) =>{
    try{
        const newSkill = new Skills({
            title: req.body.title,
            category: req.body.category,
            level: req.body.level,
            image: req.file.path
        });

        const savedSkill = await newSkill.save();
        res.status(201)
    }
})