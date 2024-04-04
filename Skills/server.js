const express=require("express")
const app=express()
const mongose=require("mongoose")
require("dotenv").config()
const routes=require("./route")
const cors=require("cors")

app.use(cors());
app.use(express.json())

mongose.connect(process.env.MONGO_URI)
.then(()=>app.listen(process.env.PORT,()=>{
    console.log("connected ....")
}))
.catch((e)=>console.log(e))

app.use("/api",routes)