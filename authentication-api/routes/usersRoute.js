const express=require("express")
const route=express.Router();
const {post,getall,get,put, delet}=require("../controllers/usersController")

route.post("/",post);
route.get("/",getall);
route.get("/:name",get);
route.put("/",put);
route.delete("/:name",delet);

module.exports=route;