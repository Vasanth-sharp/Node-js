const express=require("express")
const app=express()
const cors=require("cors")
require("dotenv").config()
const router=require("./router/route")

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT,()=>console.log(`Gk backend listenig ${process.env.PORT}`))

app.use("/api",router)