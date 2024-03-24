const express=require("express")
const app=express()
const mongoose=require("mongoose")
require("dotenv").config()
const routes=require("./routes/route")
const cors=require("cors")

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>app.listen(process.env.PORT,()=>{
    console.log("connected succesfully listenin in port")
}))
.catch((err)=>{
    console.error(err)
})

app.use("/api",routes)