const express=require("express")
const router=express.Router()
const {post,get, patch, apppatch}=require("../controller/controllers")


router.post("/",post)
router.get("/",get)
router.patch("/:id",patch)
router.patch("/app/:id",apppatch)
module.exports=router