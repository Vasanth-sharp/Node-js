const express=require("express")
const app=express()
const cors=require("cors")
const router = require("./controller/otp")

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log(`port assigned and listening in ${process.env.PORT} `)
})

app.use("/",router)