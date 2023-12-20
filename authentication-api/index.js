const express=require("express")
const app=express();
require('dotenv').config()
const mongoose=require("mongoose");
const routes=require("./routes/usersRoute")
const cors=require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>app.listen(process.env.PORT,()=>{
    console.log("Port assigned and listening...")
}))
.catch(()=>console.error("ERROR OCCURED"))

app.use("/api",routes);