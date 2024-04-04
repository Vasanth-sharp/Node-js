const express=require("express")
const { getSkills, addSkill } = require("./controller")
const router=express.Router()

router.get("/",getSkills)
router.post("/",addSkill)
module.exports=router