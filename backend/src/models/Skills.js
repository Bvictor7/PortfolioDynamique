const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category:{type: String, required: true},
    level: {type: String, enum: ["Debutant", "Intermédiaire", "Expert"], require: true},
    image: {type: String, required: true}
},
{tumestamps: true}
);

module.exports = mongoose.model("Skill", skillSchema);