const express=require("express")
const router=express.Router();
const {
    createUser,
    loginUser,
    handleVisionPrompt,
    handleChatPrompt,
    deleteAccount,
    updatePass,
    getHistory,
    serverStarupCall}=require("../controllers/usercontroller")

    router.post("/create",createUser);
    router.post("/login",loginUser);
    router.get("/history",getHistory);
    router.delete("/delete",deleteAccount);
    router.patch("/update",updatePass)
    router.post("/vprompt",handleVisionPrompt);
    router.post("/cprompt",handleChatPrompt);
    router.get("/",serverStarupCall)

module.exports=router