const express=require("express")
const { formData } = require("../controllers/formController")
const router=express.Router()

router.post("/contact",formData)

module.exports=router