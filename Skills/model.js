const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainSchema = new Schema({
    skills: {
        type: [String], // Array of strings
        required: true
    }
});

const SkillModel = mongoose.model('Skill', mainSchema);
module.exports = SkillModel;
