const express=require("express");
const router=express.Router();
const {create, readall, read, delet, update}=require("../controllers/primaryController");

router.post("/",create);
router.get("/",readall);
router.get("/:id",read);
router.delete("/:id",delet);
router.patch("/:id",update);

module.exports=router;