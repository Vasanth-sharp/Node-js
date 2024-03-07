const mongoose=require("mongoose")
const schema=mongoose.Schema

const applicationSchema = new schema({
    name: String,
    currently_doing: String,
    experience:Number,
    candidate_id: Number
});

// Define sub-schema for the "posted" object within the "employee" array
const postedSchema = new schema({
    emp_id:Number,
    post_id: Number,
    role: String,
    description: String
});

// Define schema for the "employee" array
const employeeSchema = new schema({
    id: Number,
    name: String,
    password: String,
    company: String,
    application: [applicationSchema], // Array of "application" objects
    posted: [postedSchema] // Array of "posted" objects
});


const DocumentModel = mongoose.model('jobmodel', employeeSchema);

module.exports = DocumentModel;