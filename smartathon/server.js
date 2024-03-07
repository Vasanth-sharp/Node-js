const express=require("express")
const app=express()
const cors = require('cors')
const mongoose=require("mongoose")
const router=require("./route/routes")
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://togo:togo@cluster0.ghopink.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{app.listen(4000,()=>{
    console.log("Port assignend listening in port")
})})
.catch((err)=>{
    console.log("err occured",err)
})

app.use("/api",router)